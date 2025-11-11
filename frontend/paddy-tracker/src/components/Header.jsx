import React from "react";
import { getRoleColor, getRoleIcon } from "../utils/helpers";

const Header = ({ currentUser, onLogout }) => (
  <header className="gradient-bg text-white shadow-lg">
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <i className="fas fa-cubes text-2xl md:text-3xl"></i>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Sri Lanka Rice Supply Chain</h1>
            <p className="text-xs md:text-sm opacity-90">Blockchain Traceability System</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm">
            <i className="fas fa-link"></i>
            <span>Connected to Blockchain</span>
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
              <p className="font-semibold text-sm md:text-base">{currentUser.name}</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-30 transition text-sm"
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
