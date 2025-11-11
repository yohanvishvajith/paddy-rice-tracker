import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import MyPortal from "./MyPortal";
import AddTransaction from "./AddTransaction";
import MyTransactions from "./MyTransactions";
import TrackProduct from "../shared/TrackProduct";

const UserDashboard = ({
  currentUser,
  transactions,
  setTransactions,
  onLogout,
  showNotif,
}) => {
  const [currentView, setCurrentView] = useState("add-transaction");

  return (
    <>
      <Header currentUser={currentUser} onLogout={onLogout} />

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setCurrentView("add-transaction")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "add-transaction"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-plus-circle mr-1 md:mr-2"></i>
              Add Transaction
            </button>
            <button
              onClick={() => setCurrentView("my-transactions")}
              className={`px-4 md:px-6 py-3 md:py-4 font-medium transition whitespace-nowrap text-sm md:text-base ${
                currentView === "my-transactions"
                  ? "border-b-4 border-purple-600 text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <i className="fas fa-list mr-1 md:mr-2"></i>
              My Transactions
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentView === "add-transaction" && (
        <AddTransaction
          currentUser={currentUser}
          transactions={transactions}
          setTransactions={setTransactions}
          showNotif={showNotif}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "my-transactions" && (
        <MyTransactions
          currentUser={currentUser}
          transactions={transactions}
          setCurrentView={setCurrentView}
        />
      )}

      <Footer />
    </>
  );
};

export default UserDashboard;
