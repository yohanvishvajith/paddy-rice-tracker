import React from "react";

const Analytics = () => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      Supply Chain Analytics
    </h2>
    <p className="text-gray-600 mb-8">Insights and performance metrics</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Monthly Transaction Volume
        </h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[65, 78, 90, 85, 92, 88, 95, 100, 105, 98, 110, 115].map(
            (height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {
                    [
                      "J",
                      "F",
                      "M",
                      "A",
                      "M",
                      "J",
                      "J",
                      "A",
                      "S",
                      "O",
                      "N",
                      "D",
                    ][index]
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Transaction by Stage
        </h3>
        <div className="space-y-4">
          {[
            {
              name: "Farmer",
              count: 45,
              color: "bg-green-500",
              percentage: 30,
            },
            {
              name: "Collector",
              count: 42,
              color: "bg-blue-500",
              percentage: 28,
            },
            {
              name: "Miller",
              count: 38,
              color: "bg-purple-500",
              percentage: 25,
            },
            {
              name: "Wholesaler",
              count: 15,
              color: "bg-orange-500",
              percentage: 10,
            },
            { name: "Retailer", count: 10, color: "bg-red-500", percentage: 7 },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {item.name}
                </span>
                <span className="text-sm text-gray-600">{item.count}</span>
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
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Avg. Processing Time
          </h3>
          <i className="fas fa-clock text-blue-500 text-xl"></i>
        </div>
        <p className="text-4xl font-bold text-gray-800 mb-2">3.2 days</p>
        <p className="text-sm text-green-600">
          <i className="fas fa-arrow-down mr-1"></i>18% faster than last month
        </p>
      </div>

      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Fraud Prevention</h3>
          <i className="fas fa-shield-alt text-green-500 text-xl"></i>
        </div>
        <p className="text-4xl font-bold text-gray-800 mb-2">100%</p>
        <p className="text-sm text-green-600">
          <i className="fas fa-check-circle mr-1"></i>Successfully verified
        </p>
      </div>

      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">System Uptime</h3>
          <i className="fas fa-server text-purple-500 text-xl"></i>
        </div>
        <p className="text-4xl font-bold text-gray-800 mb-2">99.9%</p>
        <p className="text-sm text-green-600">
          <i className="fas fa-check-circle mr-1"></i>Excellent performance
        </p>
      </div>
    </div>
  </div>
);

export default Analytics;
