export const getRoleColor = (role) => {
  const colors = {
    farmer: "bg-green-500",
    collector: "bg-blue-500",
    miller: "bg-purple-500",
    broker: "bg-orange-500",
    wholesaler: "bg-orange-500",
    retailer: "bg-red-500",
    admin: "bg-gray-800",
  };
  return colors[role] || "bg-gray-500";
};

export const getRoleIcon = (role) => {
  const icons = {
    farmer: "fa-seedling",
    collector: "fa-truck",
    miller: "fa-industry",
    broker: "fa-warehouse",
    wholesaler: "fa-warehouse",
    retailer: "fa-store",
    admin: "fa-user-shield",
  };
  return icons[role] || "fa-user";
};
