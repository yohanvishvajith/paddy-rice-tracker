import React from "react";

const MyTransactions = ({ currentUser, transactions, setCurrentView }) => {
  const myTransactions = transactions.filter(
    (tx) => tx.actorId === currentUser.id
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">My Transactions</h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">All transactions recorded by you</p>

      <div className="bg-white rounded-xl card-shadow overflow-hidden">
        {myTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Batch ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myTransactions.map((tx) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {tx.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {tx.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {tx.timestamp}
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
        ) : (
          <div className="text-center py-12 md:py-16 px-4">
            <i className="fas fa-inbox text-gray-300 text-5xl md:text-6xl mb-4"></i>
            <p className="text-gray-500 text-base md:text-lg">
              No transactions recorded yet
            </p>
            <button
              onClick={() => setCurrentView("add-transaction")}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-sm md:text-base"
            >
              <i className="fas fa-plus-circle mr-2"></i>
              Add Your First Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
