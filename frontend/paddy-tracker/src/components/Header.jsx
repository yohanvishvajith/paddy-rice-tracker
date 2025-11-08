import React from "react";
import { getRoleColor, getRoleIcon } from "../utils/helpers";

const Header = ({ currentUser, onLogout }) => (
  <header className="gradient-bg text-white shadow-lg">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fas fa-cubes text-3xl"></i>
          <div>
            <h1 className="text-2xl font-bold">Sri Lanka Rice Supply Chain</h1>
            <p className="text-sm opacity-90">Blockchain Traceability System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <i className="fas fa-link"></i>
            <span className="text-sm">Connected to Blockchain</span>
          </div>
          <div
            className={`flex items-center space-x-3 ${getRoleColor(
              currentUser.role
            )} px-4 py-2 rounded-lg`}
          >
            <i className={`fas ${getRoleIcon(currentUser.role)}`}></i>
            <div>
              <p className="text-xs opacity-90">
                {currentUser.role.toUpperCase()}
              </p>
              <p className="font-semibold">{currentUser.name}</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-30 transition"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Header;
