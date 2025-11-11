import React, { useState } from "react";
import { collectors, millers, wholesalers, retailers } from "../../data/mockData";

const AddTransaction = ({
  currentUser,
  transactions,
  setTransactions,
  showNotif,
  setCurrentView,
}) => {
  const [formData, setFormData] = useState({
    buyerId: "",
    productType: "",
    quantity: "",
    pricePerKg: "",
  });

  // Determine buyer list, labels, and product types based on user role
  const getBuyerConfig = () => {
    if (currentUser.role === "farmer") {
      return {
        list: collectors,
        label: "Select Collector",
        emptyText: "Select Collector",
        productLabel: "Paddy Type",
        productTypes: ["Basmati", "Jasmine", "Long Grain", "Short Grain", "Other"],
        isRice: false,
      };
    } else if (currentUser.role === "collector") {
      return {
        list: millers,
        label: "Select Miller",
        emptyText: "Select Miller",
        productLabel: "Paddy Type",
        productTypes: ["Basmati", "Jasmine", "Long Grain", "Short Grain", "Other"],
        isRice: false,
      };
    } else if (currentUser.role === "miller") {
      return {
        list: wholesalers,
        label: "Select Wholesaler",
        emptyText: "Select Wholesaler",
        productLabel: "Rice Type",
        productTypes: ["White", "Brown", "Parboiled", "Organic", "Other"],
        isRice: true,
      };
    } else if (currentUser.role === "wholesaler") {
      return {
        list: retailers,
        label: "Select Retailer",
        emptyText: "Select Retailer",
        productLabel: "Rice Type",
        productTypes: ["White", "Brown", "Parboiled", "Organic", "Other"],
        isRice: true,
      };
    }
    return {
      list: [],
      label: "Select Buyer",
      emptyText: "Select Buyer",
      productLabel: "Product Type",
      productTypes: [],
      isRice: false,
    };
  };

  const buyerConfig = getBuyerConfig();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBuyer = buyerConfig.list.find(
      (b) => b.id === formData.buyerId
    );

    const newTransaction = {
      id: `TX${String(transactions.length + 1).padStart(3, "0")}`,
      batchId: `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      product: formData.productType,
      quantity: formData.quantity,
      stage:
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1),
      actor: currentUser.name,
      actorId: currentUser.id,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      blockHash: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random()
        .toString(16)
        .substr(2, 4)}`,
      verified: true,
      location: currentUser.location,
      pricePerKg: formData.pricePerKg,
      notes: `Sold to ${selectedBuyer.name} (${selectedBuyer.id}) at LKR ${formData.pricePerKg}/kg - ${selectedBuyer.location}`,
      buyerName: selectedBuyer.name,
      buyerId: selectedBuyer.id,
      buyerLocation: selectedBuyer.location,
    };

    setTransactions([...transactions, newTransaction]);
    showNotif("Transaction added to blockchain successfully!");

    setFormData({
      buyerId: "",
      productType: "",
      quantity: "",
      pricePerKg: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Add New Transaction
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
          Record your supply chain activity on the blockchain
        </p>

        <div className="bg-white rounded-xl card-shadow p-4 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {buyerConfig.label} *
                </label>
                <select
                  value={formData.buyerId}
                  onChange={(e) =>
                    setFormData({ ...formData, buyerId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base"
                  required
                >
                  <option value="">{buyerConfig.emptyText}</option>
                  {buyerConfig.list.map((buyer) => (
                    <option key={buyer.id} value={buyer.id}>
                      {buyer.name} - {buyer.location} ({buyer.id})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Select who you're selling to
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {buyerConfig.productLabel} *
                </label>
                <select
                  value={formData.productType}
                  onChange={(e) =>
                    setFormData({ ...formData, productType: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base"
                  required
                >
                  <option value="">Select {buyerConfig.productLabel}</option>
                  {buyerConfig.productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity (kg) *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="500"
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per Kg (LKR) *
                </label>
                <input
                  type="number"
                  value={formData.pricePerKg}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerKg: e.target.value })
                  }
                  placeholder="150"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base"
                  required
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-yellow-600 mt-1 mr-3"></i>
                <div>
                  <p className="text-sm text-yellow-800 font-semibold">
                    Blockchain Transaction
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This event will be permanently recorded on the blockchain
                    and cannot be modified or deleted. Ensure all information is
                    accurate before submitting.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-sm md:text-base"
              >
                <i className="fas fa-plus-circle mr-2"></i>
                Submit to Blockchain
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("my-transactions")}
                className="sm:px-8 bg-gray-200 text-gray-700 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-300 transition text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
