import React, { useState } from "react";
import { farmers, brokers, millers, wholesalers } from "../../data/mockData";

const AddTransaction = ({
  currentUser,
  transactions,
  setTransactions,
  showNotif,
  setCurrentView,
}) => {
  const [formData, setFormData] = useState({
    supplierId: "",
    productType: "",
    quantity: "",
    supplierType: "farmer", // For miller: "farmer" or "broker"
  });

  // Determine supplier list and labels based on user role
  const getSupplierConfig = () => {
    if (currentUser.role === "miller") {
      // Miller can choose between farmer or broker
      if (formData.supplierType === "broker") {
        return {
          list: brokers,
          label: "Select Broker",
          emptyText: "Select Broker",
          notePrefix: "Purchased from broker",
        };
      }
      return {
        list: farmers,
        label: "Select Farmer",
        emptyText: "Select Farmer",
        notePrefix: "Purchased from farmer",
      };
    } else if (currentUser.role === "broker") {
      // Broker can choose between farmer or broker
      if (formData.supplierType === "broker") {
        return {
          list: brokers,
          label: "Select Broker",
          emptyText: "Select Broker",
          notePrefix: "Purchased from broker",
        };
      }
      return {
        list: farmers,
        label: "Select Farmer",
        emptyText: "Select Farmer",
        notePrefix: "Purchased from farmer",
      };
    } else if (currentUser.role === "wholesaler") {
      return {
        list: millers,
        label: "Select Miller",
        emptyText: "Select Miller",
        notePrefix: "Purchased from miller",
      };
    } else if (currentUser.role === "retailer") {
      return {
        list: wholesalers,
        label: "Select Wholesaler",
        emptyText: "Select Wholesaler",
        notePrefix: "Purchased from wholesaler",
      };
    }
    return {
      list: farmers,
      label: "Select Supplier",
      emptyText: "Select Supplier",
      notePrefix: "Purchased from",
    };
  };

  const supplierConfig = getSupplierConfig();

  const handleSupplierTypeChange = (type) => {
    setFormData({
      ...formData,
      supplierType: type,
      supplierId: "", // Reset supplier selection when type changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedSupplier = supplierConfig.list.find(
      (s) => s.id === formData.supplierId
    );

    const newTransaction = {
      id: `TX${String(transactions.length + 1).padStart(3, "0")}`,
      batchId: `BATCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      product: formData.productType,
      quantity: `${formData.quantity} kg`,
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
      notes: `${supplierConfig.notePrefix}: ${selectedSupplier.name} (${selectedSupplier.id}) - ${selectedSupplier.location}`,
      supplierName: selectedSupplier.name,
      supplierId: selectedSupplier.id,
      supplierLocation: selectedSupplier.location,
    };

    setTransactions([...transactions, newTransaction]);
    showNotif("Transaction added to blockchain successfully!");

    setFormData({
      supplierId: "",
      productType: "",
      quantity: "",
      supplierType: "farmer",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Add New Transaction
        </h2>
        <p className="text-gray-600 mb-8">
          Record your supply chain activity on the blockchain
        </p>

        <div className="bg-white rounded-xl card-shadow p-8">
          <form onSubmit={handleSubmit}>
            {/* Supplier Type Selection (for Miller and Broker) */}
            {(currentUser.role === "miller" ||
              currentUser.role === "broker") && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Purchase From *
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleSupplierTypeChange("farmer")}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                      formData.supplierType === "farmer"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <i className="fas fa-seedling mr-2"></i>
                    Farmer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSupplierTypeChange("broker")}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                      formData.supplierType === "broker"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <i className="fas fa-warehouse mr-2"></i>
                    Broker
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {supplierConfig.label} *
                </label>
                <select
                  value={formData.supplierId}
                  onChange={(e) =>
                    setFormData({ ...formData, supplierId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="">{supplierConfig.emptyText}</option>
                  {supplierConfig.list.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name} - {supplier.location} ({supplier.id})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose your supplier
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Type *
                </label>
                <select
                  value={formData.productType}
                  onChange={(e) =>
                    setFormData({ ...formData, productType: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Samba Paddy">Samba Paddy</option>
                  <option value="Samba Rice">Samba Rice</option>
                  <option value="Nadu Paddy">Nadu Paddy</option>
                  <option value="Nadu Rice">Nadu Rice</option>
                  <option value="Keeri Samba Paddy">Keeri Samba Paddy</option>
                  <option value="Keeri Samba Rice">Keeri Samba Rice</option>
                  <option value="Red Paddy">Red Paddy</option>
                  <option value="Red Rice">Red Rice</option>
                </select>
              </div>

              <div className="md:col-span-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                <i className="fas fa-plus-circle mr-2"></i>
                Submit to Blockchain
              </button>
              <button
                type="button"
                onClick={() => setCurrentView("my-transactions")}
                className="px-8 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
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
