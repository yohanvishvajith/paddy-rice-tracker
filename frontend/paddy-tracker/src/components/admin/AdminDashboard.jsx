import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Notification from "../Notification";
import AdminDashboardView from "./AdminDashboardView";
import ManageUsers from "./ManageUsers";
import AllTransactions from "./AllTransactions";
import TrackProduct from "../shared/TrackProduct";
import Analytics from "./Analytics";
import BlockchainExplorer from "./BlockchainExplorer";

const AdminDashboard = ({ currentUser, transactions, onLogout, showNotif }) => {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <>
      <Header currentUser={currentUser} onLogout={onLogout} />

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "dashboard"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i>
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView("manage-users")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "manage-users"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-users-cog mr-2"></i>
              Manage Users
            </button>
            <button
              onClick={() => setCurrentView("all-transactions")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "all-transactions"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-database mr-2"></i>
              All Transactions
            </button>
            <button
              onClick={() => setCurrentView("track")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "track"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-search-location mr-2"></i>
              Track Product
            </button>
            <button
              onClick={() => setCurrentView("analytics")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "analytics"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              Analytics
            </button>
            <button
              onClick={() => setCurrentView("blockchain")}
              className={`px-6 py-4 font-medium transition ${
                currentView === "blockchain"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-cubes mr-2"></i>
              Blockchain Explorer
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentView === "dashboard" && (
        <AdminDashboardView
          transactions={transactions}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "manage-users" && (
        <ManageUsers transactions={transactions} />
      )}
      {currentView === "all-transactions" && (
        <AllTransactions transactions={transactions} />
      )}
      {currentView === "track" && <TrackProduct transactions={transactions} />}
      {currentView === "analytics" && <Analytics />}
      {currentView === "blockchain" && (
        <BlockchainExplorer transactions={transactions} />
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
