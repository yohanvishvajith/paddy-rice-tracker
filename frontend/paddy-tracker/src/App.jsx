import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import Notification from "./components/Notification";
import { mockUsers, initialTransactions } from "./data/mockData";
import "./App.css";

function AppContent() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleRoleSelect = (roleKey) => {
    const user = mockUsers[roleKey];
    setCurrentUser(user);
    showNotif(`Welcome, ${user.name}!`);

    // Navigate to appropriate dashboard
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "farmer") {
      navigate("/farmer");
    } else if (user.role === "collector") {
      navigate("/collector");
    } else if (user.role === "miller") {
      navigate("/miller");
    } else if (user.role === "wholesaler") {
      navigate("/wholesaler");
    } else if (user.role === "retailer") {
      navigate("/retailer");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showNotif("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Notification message={notificationMessage} show={showNotification} />

      <Routes>
        <Route
          path="/"
          element={<RoleSelection onSelectRole={handleRoleSelect} />}
        />

        <Route
          path="/admin"
          element={
            currentUser?.role === "admin" ? (
              <AdminDashboard
                currentUser={currentUser}
                transactions={transactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/farmer"
          element={
            currentUser?.role === "farmer" ? (
              <UserDashboard
                currentUser={currentUser}
                transactions={transactions}
                setTransactions={setTransactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/collector"
          element={
            currentUser?.role === "collector" ? (
              <UserDashboard
                currentUser={currentUser}
                transactions={transactions}
                setTransactions={setTransactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/miller"
          element={
            currentUser?.role === "miller" ? (
              <UserDashboard
                currentUser={currentUser}
                transactions={transactions}
                setTransactions={setTransactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/wholesaler"
          element={
            currentUser?.role === "wholesaler" ? (
              <UserDashboard
                currentUser={currentUser}
                transactions={transactions}
                setTransactions={setTransactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/retailer"
          element={
            currentUser?.role === "retailer" ? (
              <UserDashboard
                currentUser={currentUser}
                transactions={transactions}
                setTransactions={setTransactions}
                onLogout={handleLogout}
                showNotif={showNotif}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
