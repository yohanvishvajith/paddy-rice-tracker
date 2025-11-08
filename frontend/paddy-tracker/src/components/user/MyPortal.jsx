import React from "react";
import { getRoleColor, getRoleIcon } from "../../utils/helpers";

const MyPortal = ({ currentUser, transactions, setCurrentView }) => {
  const myTransactions = transactions.filter(
    (tx) => tx.actorId === currentUser.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {currentUser.name}
        </h2>
        <p className="text-gray-600">Your {currentUser.role} portal</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">My Transactions</p>
              <p className="text-3xl font-bold text-gray-800">
                {myTransactions.length}
              </p>
            </div>
            <div
              className={`${getRoleColor(
                currentUser.role
              )} bg-opacity-10 p-4 rounded-lg`}
            >
              <i
                className={`fas ${getRoleIcon(currentUser.role)} text-2xl`}
              ></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Quantity</p>
              <p className="text-3xl font-bold text-gray-800">
                {myTransactions.reduce(
                  (sum, tx) => sum + parseInt(tx.quantity),
                  0
                )}{" "}
                kg
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <i className="fas fa-weight text-blue-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Verified</p>
              <p className="text-3xl font-bold text-gray-800">100%</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <i className="fas fa-check-circle text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Location</p>
              <p className="text-xl font-bold text-gray-800">
                {currentUser.location}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <i className="fas fa-map-marker-alt text-purple-600 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl card-shadow p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView("add-transaction")}
            className="p-6 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition"
          >
            <i className="fas fa-plus-circle text-purple-600 text-3xl mb-3"></i>
            <h4 className="font-bold text-gray-800">Add New Transaction</h4>
            <p className="text-sm text-gray-600 mt-2">
              Record a new supply chain event
            </p>
          </button>

          <button
            onClick={() => setCurrentView("track")}
            className="p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <i className="fas fa-search-location text-blue-600 text-3xl mb-3"></i>
            <h4 className="font-bold text-gray-800">Track Product</h4>
            <p className="text-sm text-gray-600 mt-2">Search by batch ID</p>
          </button>

          <button
            onClick={() => setCurrentView("my-transactions")}
            className="p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition"
          >
            <i className="fas fa-list text-green-600 text-3xl mb-3"></i>
            <h4 className="font-bold text-gray-800">View My Records</h4>
            <p className="text-sm text-gray-600 mt-2">
              See all your transactions
            </p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          My Recent Activity
        </h3>
        {myTransactions.length > 0 ? (
          <div className="space-y-4">
            {myTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <i className="fas fa-check-circle text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {tx.product} - {tx.quantity}
                    </p>
                    <p className="text-sm text-gray-600">Batch: {tx.batchId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{tx.timestamp}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
            <p className="text-gray-500">
              No transactions yet. Click "Add New Transaction" to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortal;
