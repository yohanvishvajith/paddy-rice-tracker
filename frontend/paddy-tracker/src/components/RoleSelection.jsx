import React from "react";
import { mockUsers } from "../data/mockData";
import { getRoleColor, getRoleIcon } from "../utils/helpers";

const RoleSelection = ({ onSelectRole }) => {
  const roles = [
    {
      key: "admin",
      label: "Admin",
      icon: "fa-user-shield",
      color: "bg-gray-800",
      description: "System Administrator",
    },
    {
      key: "miller1",
      label: "Miller",
      icon: "fa-industry",
      color: "bg-purple-500",
      description: "Modern Rice Mill Ltd.",
    },
    {
      key: "broker1",
      label: "Broker",
      icon: "fa-warehouse",
      color: "bg-orange-500",
      description: "Lanka Wholesale Traders",
    },
    {
      key: "wholesaler1",
      label: "Wholesaler",
      icon: "fa-warehouse",
      color: "bg-orange-500",
      description: "National Distributors",
    },
    {
      key: "retailer1",
      label: "Retailer",
      icon: "fa-store",
      color: "bg-red-500",
      description: "City Super Market",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl card-shadow p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-100 p-4 rounded-full mb-4">
            <i className="fas fa-cubes text-purple-600 text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sri Lanka Rice Supply Chain
          </h1>
          <p className="text-gray-600">Blockchain Traceability System</p>
          <p className="text-gray-500 mt-2">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => onSelectRole(role.key)}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition text-left group"
            >
              <div className="flex items-center space-x-4 mb-3">
                <div
                  className={`${role.color} p-4 rounded-lg group-hover:scale-110 transition`}
                >
                  <i className={`fas ${role.icon} text-white text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {role.label}
                  </h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                ID: {mockUsers[role.key].id} | Location:{" "}
                {mockUsers[role.key].location}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-2"></i>
            This is a demo application. Select any role to explore the
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
