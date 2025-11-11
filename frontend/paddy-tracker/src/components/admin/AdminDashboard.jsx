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
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "dashboard"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-chart-line mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </button>
            <button
              onClick={() => setCurrentView("manage-users")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "manage-users"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-users-cog mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Manage Users</span>
              <span className="sm:hidden">Users</span>
            </button>
            <button
              onClick={() => setCurrentView("all-transactions")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "all-transactions"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-database mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">All Transactions</span>
              <span className="sm:hidden">All TX</span>
            </button>
            <button
              onClick={() => setCurrentView("track")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "track"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-search-location mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Track Product</span>
              <span className="sm:hidden">Track</span>
            </button>
            <button
              onClick={() => setCurrentView("analytics")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "analytics"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-chart-bar mr-1 md:mr-2"></i>
              Analytics
            </button>
            <button
              onClick={() => setCurrentView("blockchain")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "blockchain"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-cubes mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Blockchain Explorer</span>
              <span className="sm:hidden">Explorer</span>
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
