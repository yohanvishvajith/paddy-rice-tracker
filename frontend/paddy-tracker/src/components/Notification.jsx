import React from "react";

const Notification = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-24 right-8 z-50 animate-slide-in">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
        <i className="fas fa-check-circle text-2xl"></i>
        <div>
          <p className="font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
