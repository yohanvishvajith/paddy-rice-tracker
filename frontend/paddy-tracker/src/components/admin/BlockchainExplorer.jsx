import React from "react";

const BlockchainExplorer = ({ transactions }) => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      Blockchain Explorer
    </h2>
    <p className="text-gray-600 mb-8">
      View all blocks and transactions on the blockchain
    </p>

    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-cubes text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Blocks</p>
              <p className="text-2xl font-bold text-gray-800">
                {15847 + transactions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-500">Latest Block</p>
              <p className="text-lg font-bold text-gray-800">
                #{15847 + transactions.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gas Price</p>
              <p className="text-lg font-bold text-gray-800">2.5 Gwei</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Batch ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Block Hash
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-purple-600 font-mono font-semibold">
                    {tx.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-gray-800">
                    {tx.batchId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-800">{tx.stage}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {tx.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm text-gray-600">
                    {tx.blockHash}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    <i className="fas fa-check-circle mr-1"></i>Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BlockchainExplorer;
