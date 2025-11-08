import React, { useState } from "react";
import { getRoleColor, getRoleIcon } from "../../utils/helpers";

const TrackProduct = ({ transactions }) => {
  const [searchBatch, setSearchBatch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleSearch = () => {
    if (searchBatch) {
      setSelectedBatch(searchBatch);
    }
  };

  const batchTransactions = selectedBatch
    ? transactions.filter((tx) => tx.batchId === selectedBatch)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Track Product Journey
        </h2>
        <p className="text-gray-600 mb-8">
          Enter batch ID to trace the complete supply chain
        </p>

        <div className="bg-white rounded-xl card-shadow p-6 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Batch ID (e.g., BATCH-2025-001)"
                value={searchBatch}
                onChange={(e) => setSearchBatch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              <i className="fas fa-search mr-2"></i>
              Track
            </button>
          </div>
        </div>

        {selectedBatch && batchTransactions.length > 0 && (
          <div className="bg-white rounded-xl card-shadow p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Batch: {selectedBatch}
              </h3>
              <p className="text-gray-600">
                Product: {batchTransactions[0].product} | Transactions:{" "}
                {batchTransactions.length}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-purple-600"></div>

              <div className="space-y-8">
                {batchTransactions.map((tx, index) => (
                  <div key={tx.id} className="relative pl-20">
                    <div
                      className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${getRoleColor(
                        tx.stage.toLowerCase()
                      )}`}
                    >
                      <i
                        className={`fas ${getRoleIcon(
                          tx.stage.toLowerCase()
                        )} text-2xl`}
                      ></i>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-800">
                          {tx.stage}
                        </h4>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                          <i className="fas fa-check-circle mr-1"></i>Verified
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Actor</p>
                          <p className="font-semibold text-gray-800">
                            {tx.actor}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Timestamp</p>
                          <p className="font-semibold text-gray-800">
                            {tx.timestamp}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Product</p>
                          <p className="font-semibold text-gray-800">
                            {tx.product}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-semibold text-gray-800">
                            {tx.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold text-gray-800">
                            {tx.location}
                          </p>
                        </div>
                      </div>
                      {tx.notes && (
                        <div className="mb-4 p-3 bg-blue-50 rounded">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {tx.notes}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm">
                        <i className="fas fa-cube text-purple-600"></i>
                        <span className="text-gray-600 font-mono">
                          {tx.blockHash}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedBatch && batchTransactions.length === 0 && (
          <div className="bg-white rounded-xl card-shadow p-12 text-center">
            <i className="fas fa-search text-gray-300 text-6xl mb-4"></i>
            <p className="text-gray-500 text-lg">
              No transactions found for batch "{selectedBatch}"
            </p>
            <p className="text-gray-400 mt-2">
              Please check the batch ID and try again
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackProduct;
