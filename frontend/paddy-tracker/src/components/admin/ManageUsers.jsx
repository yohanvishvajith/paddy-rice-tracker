import React, { useState } from "react";
import { allUsers } from "../../data/mockData";
import { getRoleColor, getRoleIcon } from "../../utils/helpers";

const ManageUsers = ({ transactions }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    role: "",
    location: "",
    nic: "",
    companyRegNumber: "",
  });

  // Determine if we need NIC or Company Registration Number based on role
  const requiresNIC = formData.role === "farmer" || formData.role === "broker";
  const requiresCompanyReg =
    formData.role === "miller" || formData.role === "wholesaler";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add the logic to add the user to your data
    console.log("New User:", formData);
    // Reset form and close modal
    setFormData({
      userId: "",
      name: "",
      role: "",
      location: "",
      nic: "",
      companyRegNumber: "",
    });
    setShowModal(false);
    // You could add a notification here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Manage Users
          </h2>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Transactions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(allUsers).map(([userId, user]) => {
                const userTxCount = transactions.filter(
                  (tx) => tx.actorId === user.id
                ).length;
                return (
                  <tr key={userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-600">
                        {user.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 ${getRoleColor(
                          user.role
                        )} bg-opacity-10 text-xs font-semibold rounded-full`}
                      >
                        <i className={`fas ${getRoleIcon(user.role)} mr-1`}></i>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {userTxCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl card-shadow max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  <i className="fas fa-user-plus mr-2 text-purple-600"></i>
                  Add New User
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User ID *
                  </label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
                    }
                    placeholder="e.g., FRM005, MIL003"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="farmer">Farmer</option>
                    <option value="collector">Collector</option>
                    <option value="miller">Miller</option>
                    <option value="broker">Broker</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="retailer">Retailer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City/District"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                {/* NIC Field - Show for Farmer or Broker */}
                {requiresNIC && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      NIC Number *
                    </label>
                    <input
                      type="text"
                      value={formData.nic}
                      onChange={(e) =>
                        setFormData({ ...formData, nic: e.target.value })
                      }
                      placeholder="e.g., 199512345678 or 951234567V"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      National Identity Card number
                    </p>
                  </div>
                )}

                {/* Company Registration Number - Show for Miller or Wholesaler */}
                {requiresCompanyReg && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Registration Number *
                    </label>
                    <input
                      type="text"
                      value={formData.companyRegNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyRegNumber: e.target.value,
                        })
                      }
                      placeholder="e.g., PV 12345"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Business registration number from Registrar of Companies
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-600 mt-1 mr-3"></i>
                  <div>
                    <p className="text-sm text-blue-800 font-semibold">
                      User Registration
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      The new user will be added to the system and will be able
                      to record transactions on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
