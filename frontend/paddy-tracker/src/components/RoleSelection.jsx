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
      key: "farmer1",
      label: "Farmer",
      icon: "fa-seedling",
      color: "bg-green-600",
      description: "Bandara Mudiyanselage",
    },
    {
      key: "collector1",
      label: "Collector",
      icon: "fa-truck",
      color: "bg-blue-600",
      description: "Central Collector Co.",
    },
    {
      key: "miller1",
      label: "Miller",
      icon: "fa-industry",
      color: "bg-purple-500",
      description: "Modern Rice Mill Ltd.",
    },
    {
      key: "wholesaler1",
      label: "Wholesaler",
      icon: "fa-dolly",
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
      <div className="bg-white rounded-2xl card-shadow p-4 sm:p-6 md:p-8 max-w-6xl w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block bg-purple-100 p-3 md:p-4 rounded-full mb-4">
            <i className="fas fa-cubes text-purple-600 text-3xl md:text-4xl"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Sri Lanka Rice Supply Chain
          </h1>
          <p className="text-sm md:text-base text-gray-600">Blockchain Traceability System</p>
          <p className="text-sm text-gray-500 mt-2">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => onSelectRole(role.key)}
              className="p-4 md:p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition text-left group"
            >
              <div className="flex items-center space-x-3 md:space-x-4 mb-3">
                <div
                  className={`${role.color} p-3 md:p-4 rounded-lg group-hover:scale-110 transition`}
                >
                  <i className={`fas ${role.icon} text-white text-xl md:text-2xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    {role.label}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">{role.description}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-2">
                ID: {mockUsers[role.key].id} | Location:{" "}
                {mockUsers[role.key].location}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 text-center">
          <p className="text-xs md:text-sm text-gray-600">
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
