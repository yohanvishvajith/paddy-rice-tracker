import React from "react";
import { allUsers } from "../../data/mockData";
import { getRoleColor, getRoleIcon } from "../../utils/helpers";

const AdminDashboardView = ({ transactions, setCurrentView }) => {
  const userCount = Object.keys(allUsers).length;
  const farmerCount = Object.values(allUsers).filter(
    (u) => u.role === "farmer"
  ).length;
  const collectorCount = Object.values(allUsers).filter(
    (u) => u.role === "collector"
  ).length;
  const millerCount = Object.values(allUsers).filter(
    (u) => u.role === "miller"
  ).length;
  const wholesalerCount = Object.values(allUsers).filter(
    (u) => u.role === "wholesaler"
  ).length;
  const retailerCount = Object.values(allUsers).filter(
    (u) => u.role === "retailer"
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h2>
        <p className="text-gray-600">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">{userCount}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <i className="fas fa-users text-purple-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-800">
                {transactions.length}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <i className="fas fa-exchange-alt text-blue-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Unique Batches</p>
              <p className="text-3xl font-bold text-gray-800">
                {[...new Set(transactions.map((tx) => tx.batchId))].length}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <i className="fas fa-boxes text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Verification Rate</p>
              <p className="text-3xl font-bold text-gray-800">100%</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl card-shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            User Distribution by Role
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Farmers",
                count: farmerCount,
                color: "bg-green-500",
                percentage: ((farmerCount / userCount) * 100).toFixed(0),
              },
              {
                name: "Collectors",
                count: collectorCount,
                color: "bg-blue-500",
                percentage: ((collectorCount / userCount) * 100).toFixed(0),
              },
              {
                name: "Millers",
                count: millerCount,
                color: "bg-purple-500",
                percentage: ((millerCount / userCount) * 100).toFixed(0),
              },
              {
                name: "Wholesalers",
                count: wholesalerCount,
                color: "bg-orange-500",
                percentage: ((wholesalerCount / userCount) * 100).toFixed(0),
              },
              {
                name: "Retailers",
                count: retailerCount,
                color: "bg-red-500",
                percentage: ((retailerCount / userCount) * 100).toFixed(0),
              },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {item.count} users
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl card-shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Recent System Activity
          </h3>
          <div className="space-y-3">
            {transactions
              .slice(-5)
              .reverse()
              .map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${getRoleColor(
                        tx.stage.toLowerCase()
                      )} bg-opacity-20 p-2 rounded`}
                    >
                      <i
                        className={`fas ${getRoleIcon(
                          tx.stage.toLowerCase()
                        )} text-sm`}
                      ></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {tx.actor}
                      </p>
                      <p className="text-xs text-gray-600">{tx.batchId}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {tx.timestamp.split(" ")[1]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setCurrentView("manage-users")}
          className="bg-white p-6 rounded-xl card-shadow hover:shadow-lg transition text-left"
        >
          <i className="fas fa-users-cog text-purple-600 text-3xl mb-3"></i>
          <h4 className="font-bold text-gray-800 mb-2">Manage Users</h4>
          <p className="text-sm text-gray-600">
            Add, edit, or remove user accounts
          </p>
        </button>

        <button
          onClick={() => setCurrentView("all-transactions")}
          className="bg-white p-6 rounded-xl card-shadow hover:shadow-lg transition text-left"
        >
          <i className="fas fa-database text-blue-600 text-3xl mb-3"></i>
          <h4 className="font-bold text-gray-800 mb-2">
            View All Transactions
          </h4>
          <p className="text-sm text-gray-600">Complete transaction history</p>
        </button>

        <button
          onClick={() => setCurrentView("analytics")}
          className="bg-white p-6 rounded-xl card-shadow hover:shadow-lg transition text-left"
        >
          <i className="fas fa-chart-bar text-green-600 text-3xl mb-3"></i>
          <h4 className="font-bold text-gray-800 mb-2">Analytics & Reports</h4>
          <p className="text-sm text-gray-600">Detailed system insights</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardView;
