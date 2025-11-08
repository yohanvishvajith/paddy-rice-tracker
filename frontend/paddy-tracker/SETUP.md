# Sri Lanka Rice Supply Chain - Blockchain Traceability System

A React-based blockchain traceability system for tracking rice supply chain from farm to market in Sri Lanka.

## Features

- **Role-Based Dashboards**

  - Admin Dashboard with system overview and management
  - Miller Portal for rice mill operations
  - Broker Portal for wholesale trading
  - Wholesaler Portal for distribution

- **Key Functionalities**
  - Transaction recording on blockchain
  - Product traceability by batch ID
  - Real-time verification
  - Analytics and reporting
  - User management (Admin)
  - Blockchain explorer (Admin)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Install Tailwind CSS** (if not already installed)

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Available Roles

Select from the following roles on the welcome screen:

- **Admin** - System Administrator

  - ID: ADM001
  - Access to all features including user management and analytics

- **Miller** - Modern Rice Mill Ltd.

  - ID: MIL001
  - Location: Colombo

- **Broker** - Lanka Wholesale Traders

  - ID: BRK001
  - Location: Colombo

- **Wholesaler** - National Distributors
  - ID: WHL001
  - Location: Kandy

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Font Awesome Icons

## Project Structure

```
src/
├── components/
│   ├── admin/           # Admin dashboard components
│   ├── user/            # User portal components
│   ├── shared/          # Shared components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Notification.jsx
│   └── RoleSelection.jsx
├── data/
│   └── mockData.js      # Mock blockchain data
├── utils/
│   └── helpers.js       # Utility functions
├── App.jsx
└── main.jsx
```

## Features by Role

### Admin Dashboard

- System overview with statistics
- User management
- All transactions view
- Product tracking
- Analytics and reports
- Blockchain explorer

### Miller/Broker/Wholesaler Portal

- Personal dashboard
- Add new transactions
- View my transactions
- Track products by batch ID

## Development

This project was developed by:

- TG/2020/671
- TG/2020/675

Supervised by: MS.W.A.Malsha Prabuddhi
Faculty of Technology - Department of ICT

## License

© 2025 Sri Lanka Rice Supply Chain Blockchain System
