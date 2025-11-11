from flask import Flask, render_template, request, jsonify, session
import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import errorcode

# load .env from project root if present
load_dotenv()

app = Flask(__name__)
# server-side sessions: set a secret key (override with FLASK_SECRET in prod)
app.secret_key = os.environ.get('FLASK_SECRET', 'dev-secret')

# MySQL configuration - change via environment variables or edit below
MYSQL_HOST = os.environ.get('MYSQL_HOST', '127.0.0.1')
MYSQL_PORT = int(os.environ.get('MYSQL_PORT', 3306))
MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', '')
MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE', 'rice_supply')


def get_connection(db=None):
    cfg = {
        'host': MYSQL_HOST,
        'user': MYSQL_USER,
        'password': MYSQL_PASSWORD,
        'port': MYSQL_PORT,
        'autocommit': True,
    }
    if db:
        cfg['database'] = db
    return mysql.connector.connect(**cfg)


def init_db():
    # Create database if not exists and create users table
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{MYSQL_DATABASE}` DEFAULT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';")
        cursor.close()
        conn.close()

        conn = get_connection(MYSQL_DATABASE)
        cursor = conn.cursor()
        create_table = '''
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_type VARCHAR(50) NOT NULL,
            nic VARCHAR(64),
            full_name VARCHAR(255),
            company_register_number VARCHAR(128),
            company_name VARCHAR(255),
            address TEXT,
            district VARCHAR(128),
            contact_number VARCHAR(64),
            password VARCHAR(255),
            total_area_of_paddy_land VARCHAR(64),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        '''
        cursor.execute(create_table)
        cursor.close()
        conn.close()
        # Create transactions table to record transfers/purchases
        conn = get_connection(MYSQL_DATABASE)
        cursor = conn.cursor()
        create_tx = '''
        CREATE TABLE IF NOT EXISTS `transaction` (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `from` VARCHAR(255),
            `to` VARCHAR(255),
            `type` VARCHAR(100),
            quantity DECIMAL(14,3),
            `datetime` DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        '''
        try:
            cursor.execute(create_tx)
        except mysql.connector.Error as e:
            # Log and continue; table creation is best-effort
            print('Could not create transaction table:', e)
        finally:
            cursor.close()
            conn.close()
        # Create stock table to track per-user stock levels
        conn = get_connection(MYSQL_DATABASE)
        cursor = conn.cursor()
        create_stock = '''
        CREATE TABLE IF NOT EXISTS `stock` (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id varchar(255),
            `type` VARCHAR(128),
            amount DECIMAL(20,3) DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX (user_id),
            INDEX (`type`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        '''
        try:
            cursor.execute(create_stock)
        except mysql.connector.Error as e:
            print('Could not create stock table:', e)
        finally:
            cursor.close()
            conn.close()
        print('Database initialized (database/table ensured).')
    except mysql.connector.Error as err:
        print('Failed initializing database:', err)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/app')
def app_page():
    # serve the main application page
    return render_template('index.html')


@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    password = (data.get('password') or '').strip()
    role = (data.get('role') or '').strip()

    # quick admin shortcut
    if username == 'admin' and password == 'admin' and role.lower() == 'admin':
        # set a minimal session for admin
        session['user_id'] = 'admin'
        session['user_type'] = 'Admin'
        session['full_name'] = 'Administrator'
        return jsonify({'ok': True, 'role': 'Admin'})

    # treat username as a string identifier (no numeric validation)
    try:
        conn = get_connection(MYSQL_DATABASE)
        cur = conn.cursor(dictionary=True)
        # verify password exists in table; if password column missing this will raise
        try:
            cur.execute('SELECT id, user_type FROM users WHERE id = %s AND password = %s LIMIT 1', (username, password))
        except mysql.connector.Error:
            # fallback: table might not have password column
            cur.close()
            conn.close()
            return jsonify({'ok': False, 'error': 'Server not configured with password column'}), 500

        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return jsonify({'ok': False, 'error': 'Invalid credentials'}), 401

        user_type = (row.get('user_type') or '').strip()
        # match role (case-insensitive startswith) to allow slight variations
        if user_type.lower().startswith(role.lower()):
            # set server-side session values
            session['user_id'] = row.get('id')
            session['user_type'] = row.get('user_type')
            session['full_name'] = row.get('full_name')
            return jsonify({'ok': True, 'role': user_type})
        else:
            return jsonify({'ok': False, 'error': 'Role does not match user account'}), 403
    except Exception as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


@app.route('/collecter')
def collecter_page():
    return render_template('collecter.html')


@app.route('/miller')
def miller_page():
    return render_template('miller.html')


@app.route('/api/me', methods=['GET'])
def api_me():
    """Return the current logged-in user (from server-side session).
    Response: { ok: True, user_id, user_type, full_name } or 401
    """
    uid = session.get('user_id')
    if not uid:
        return jsonify({'ok': False, 'error': 'Not authenticated'}), 401
    return jsonify({'ok': True, 'user_id': uid, 'user_type': session.get('user_type'), 'full_name': session.get('full_name')})


def log_last_inserted_user(user_type):
    """Fetch the most recently created user's ID by user_type.
    Always return the next ID (e.g., COL5, FAR1, MIL10).
    """
    try:
        # Prefix mapping for each user type
        prefix_map = {
            "Collector": "COL",
            "Farmer": "FAR",
            "Miller": "MIL"
        }

        # Default prefix = first 3 letters of user_type if not found
        prefix = prefix_map.get(user_type, user_type[:3].upper())

        conn = get_connection(MYSQL_DATABASE)
        cur = conn.cursor(dictionary=True)

        query = """
            SELECT id FROM users
            WHERE user_type = %s
            ORDER BY created_at DESC
            LIMIT 1
        """
        cur.execute(query, (user_type,))
        row = cur.fetchone()

        # Determine next numeric part
        if row and row.get("id"):
            user_id = str(row["id"])
            numeric_part = user_id[3:] if len(user_id) > 3 else "0"
            try:
                next_number = int(numeric_part) + 1
            except ValueError:
                next_number = 1
        else:
            next_number = 1

        cur.close()
        conn.close()

        # Build the new ID
        next_id = f"{prefix}{next_number}"
        return next_id

    except Exception as e:
        print("[log_last_inserted_user] Error fetching last inserted user:", e)
        return None

@app.route('/api/users', methods=['GET'])
def api_get_users():
    try:
        conn = get_connection(MYSQL_DATABASE)
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users ORDER BY id DESC')
        rows = cursor.fetchall()
        # add computed user_code to each row (do not store in DB)
        prefix_map = {
            'Farmer': 'FAR',
            'Collecter': 'COL',
            'Miller': 'MIL'
        }
        for r in rows:
            try:
                prefix = prefix_map.get(r.get('user_type'), 'USR')
                r['user_code'] = f"{prefix}{int(r.get('id')):06d}" if r.get('id') is not None else None
            except Exception:
                r['user_code'] = None

        cursor.close()
        conn.close()
        return jsonify(rows)
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


@app.route('/api/users/by_type', methods=['GET'])
def api_get_users_by_type():
    """Return list of users for a given user type.
    Query params:
      - type (string): user type to filter by (case-insensitive, substring match)
    Response: JSON array of {id, full_name, user_code}
    """
    typ = (request.args.get('type') or request.args.get('user_type') or '').strip()
    if not typ:
        return jsonify({'error': 'query parameter "type" is required'}), 400

    try:
        conn = get_connection(MYSQL_DATABASE)
        cur = conn.cursor(dictionary=True)
        # Case-insensitive substring match to be forgiving with stored values
        sql = 'SELECT id, full_name FROM users WHERE LOWER(user_type) LIKE %s ORDER BY id'
        cur.execute(sql, (f"%{typ.lower()}%",))
        rows = cur.fetchall()

        prefix_map = {
            'Farmer': 'FAR',
            'Collecter': 'COL',
            'Miller': 'MIL'
        }
        out = []
        for r in rows:
            try:
                prefix = prefix_map.get(r.get('user_type'), 'USR')
                user_code = f"{prefix}{int(r.get('id')):06d}" if r.get('id') is not None else None
            except Exception:
                user_code = None
            out.append({'id': r.get('id'), 'full_name': r.get('full_name'), 'user_code': user_code})

        cur.close()
        conn.close()
        return jsonify(out)
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


@app.route('/api/transactions', methods=['POST'])
def api_add_transaction():
    """Insert a transaction record into the transaction table.
    Expects JSON body: { from, to, type, quantity, datetime }
    """
    payload = request.get_json() or {}
    from_val = payload.get('from')
    to_val = payload.get('to')
    ttype = payload.get('type')
    quantity = payload.get('quantity')
    dt = payload.get('datetime')

    # basic validation
    if from_val is None or to_val is None or not ttype or quantity is None:
        return jsonify({'ok': False, 'error': 'Missing required fields (from,to,type,quantity)'}), 400

    try:
        # convert quantity to Decimal-like value (float is acceptable here)
        qty = float(quantity)
    except Exception:
        return jsonify({'ok': False, 'error': 'Invalid quantity'}), 400

    try:
        conn = get_connection(MYSQL_DATABASE)
        cur = conn.cursor()
        insert_sql = 'INSERT INTO `transaction` (`from`, `to`, `type`, quantity, `datetime`) VALUES (%s, %s, %s, %s, %s)'
        cur.execute(insert_sql, (str(from_val), str(to_val), ttype, qty, dt))
        last_id = cur.lastrowid
        try:
            conn.commit()
        except Exception:
            pass
        cur.close()
        conn.close()
        return jsonify({'ok': True, 'id': last_id}), 201
    except mysql.connector.Error as err:
        return jsonify({'ok': False, 'error': str(err)}), 500


@app.route('/api/transactions', methods=['GET'])
def api_get_transactions():
    """Return transactions. Optional query param `to` to filter by recipient (matches transaction.`to`).
    """
    to_param = request.args.get('to')
    try:
        conn = get_connection(MYSQL_DATABASE)
        cur = conn.cursor(dictionary=True)
        if to_param:
            sql = 'SELECT id, `from`, `to`, `type`, quantity, `datetime`, created_at FROM `transaction` WHERE `to` = %s ORDER BY id DESC'
            cur.execute(sql, (str(to_param),))
        else:
            sql = 'SELECT id, `from`, `to`, `type`, quantity, `datetime`, created_at FROM `transaction` ORDER BY id DESC LIMIT 200'
            cur.execute(sql)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(rows)
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


@app.route('/api/users', methods=['POST'])
def api_add_user():
    payload = request.get_json() or {}
    user_type = payload.get('userType')
    # map fields safely and normalize to single address and full_name
    nic = payload.get('nic')
    full_name = payload.get('fullName')
    company_register_number = payload.get('companyRegisterNumber')
    company_name = payload.get('companyName')
    # accept either a single 'address' or the older per-type fields and coalesce
    address = payload.get('address') or payload.get('homeAddress') or payload.get('collectorAddress') or payload.get('millerAddress') or ''
    district = payload.get('district')
    contact_number = payload.get('contactNumber')
    total_area = payload.get('totalAreaOfPaddyLand')
    id = (log_last_inserted_user(user_type))
   
    try:
        conn = get_connection(MYSQL_DATABASE)
        cursor = conn.cursor()
        insert_sql = '''
            INSERT INTO users (user_type, nic, full_name, company_register_number, company_name, address, district, contact_number, total_area_of_paddy_land,id,password)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        '''
        cursor.execute(insert_sql, (user_type, nic, full_name, company_register_number, company_name, address, district, contact_number, total_area,id,"123456"))
        # Try to get the inserted id reliably. Prefer cursor.lastrowid, but fall back to LAST_INSERT_ID().
        last_id = cursor.lastrowid
        if not last_id:
            try:
                cursor.execute('SELECT LAST_INSERT_ID()')
                last_id_row = cursor.fetchone()
                if last_id_row:
                    # fetchone() returns a tuple like (id,)
                    last_id = last_id_row[0]
            except Exception:
                last_id = None

        # Ensure the insert is committed
        try:
            conn.commit()
        except Exception:
            pass

        # compute a user_code for the response (do not persist)
        prefix_map = {
            'Farmer': 'FAR',
            'Collecter': 'COL',
            'Miller': 'MIL'
        }

        cursor.close()

        # return the inserted row with a computed user_code
        rc = conn.cursor(dictionary=True)
        row = None
        if last_id:
            rc.execute('SELECT * FROM users WHERE id = %s', (last_id,))
            row = rc.fetchone()
            if row is not None:
                try:
                    prefix = prefix_map.get(user_type, 'USR')
                    row['user_code'] = f"{prefix}{int(last_id):06d}"
                except Exception:
                    row['user_code'] = None
        else:
            # As a safe fallback, try to return the most recent row matching some of the unique fields
            try:
                rc.execute('SELECT * FROM users WHERE user_type = %s ORDER BY id DESC LIMIT 1', (user_type,))
                row = rc.fetchone()
                if row and row.get('id') is not None:
                    try:
                        prefix = prefix_map.get(row.get('user_type'), 'USR')
                        row['user_code'] = f"{prefix}{int(row.get('id')):06d}"
                    except Exception:
                        row['user_code'] = None
            except Exception:
                row = None

        rc.close()
        conn.close()
        return jsonify(row), 201
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
