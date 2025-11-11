// Mock blockchain transaction data
export const initialTransactions = [
  {
    id: "TX001",
    batchId: "BATCH-2025-001",
    product: "Samba Paddy",
    quantity: "500",
    stage: "Farmer",
    actor: "Bandara Mudiyanselage",
    actorId: "FRM001",
    timestamp: "2025-10-28 08:30",
    blockHash: "0x7a8f...3d2e",
    verified: true,
    location: "Polonnaruwa",
    notes: "Organic farming, good weather conditions",
    pricePerKg: "80",
    collectorId: "COL001",
    collectorName: "Central Collector Co.",
  },
  {
    id: "TX002",
    batchId: "BATCH-2025-001",
    product: "Samba Paddy",
    quantity: "495",
    stage: "Collector",
    actor: "Central Collector Co.",
    actorId: "COL001",
    timestamp: "2025-10-29 10:15",
    blockHash: "0x9b2c...4e1f",
    verified: true,
    location: "Kurunegala",
    notes: "Collected and transported in proper conditions",
    pricePerKg: "85",
  },
  {
    id: "TX003",
    batchId: "BATCH-2025-001",
    product: "White Rice",
    quantity: "340",
    stage: "Miller",
    actor: "Modern Rice Mill Ltd.",
    actorId: "MIL001",
    timestamp: "2025-10-30 14:20",
    blockHash: "0x3f5a...7c9b",
    verified: true,
    location: "Colombo",
    notes: "Milled to premium quality, 68.7% yield",
    pricePerKg: "150",
    wholeSalerId: "WHL001",
    wholeSalerName: "National Distributors",
  },
];

// Mock user data for different roles
export const mockUsers = {
  admin: {
    role: "admin",
    name: "System Administrator",
    id: "ADM001",
    location: "Colombo",
  },
  farmer1: {
    role: "farmer",
    name: "Bandara Mudiyanselage",
    id: "FRM001",
    location: "Polonnaruwa",
  },
  farmer2: {
    role: "farmer",
    name: "Sunil Perera",
    id: "FRM002",
    location: "Anuradhapura",
  },
  collector1: {
    role: "collector",
    name: "Central Collector Co.",
    id: "COL001",
    location: "Kurunegala",
  },
  collector2: {
    role: "collector",
    name: "Eastern Transport & Collectors",
    id: "COL002",
    location: "Batticaloa",
  },
  miller1: {
    role: "miller",
    name: "Modern Rice Mill Ltd.",
    id: "MIL001",
    location: "Colombo",
  },
  miller2: {
    role: "miller",
    name: "Traditional Mill Co.",
    id: "MIL002",
    location: "Gampaha",
  },
  broker1: {
    role: "broker",
    name: "Lanka Wholesale Traders",
    id: "BRK001",
    location: "Colombo",
  },
  wholesaler1: {
    role: "wholesaler",
    name: "National Distributors",
    id: "WHL001",
    location: "Kandy",
  },
  wholesaler2: {
    role: "wholesaler",
    name: "Lanka Wholesale Traders",
    id: "WHL002",
    location: "Colombo",
  },
  retailer1: {
    role: "retailer",
    name: "City Super Market",
    id: "RET001",
    location: "Colombo",
  },
  retailer2: {
    role: "retailer",
    name: "Village Store",
    id: "RET002",
    location: "Matara",
  },
};

// Collectors list for selection (for Farmer)
export const collectors = [
  {
    id: "COL001",
    name: "Central Collector Co.",
    location: "Kurunegala",
  },
  {
    id: "COL002",
    name: "Eastern Transport & Collectors",
    location: "Batticaloa",
  },
  {
    id: "COL003",
    name: "Southern Logistics",
    location: "Galle",
  },
  {
    id: "COL004",
    name: "Northern Carriers",
    location: "Jaffna",
  },
];

// Farmers list for selection
export const farmers = [
  {
    id: "FRM001",
    name: "Bandara Mudiyanselage",
    location: "Polonnaruwa",
  },
  {
    id: "FRM002",
    name: "Sunil Perera",
    location: "Anuradhapura",
  },
  {
    id: "FRM003",
    name: "Nimal Silva",
    location: "Kurunegala",
  },
  {
    id: "FRM004",
    name: "Kamal Fernando",
    location: "Ampara",
  },
];


// Millers list for selection (for Collector)
export const millers = [
  {
    id: "MIL001",
    name: "Modern Rice Mill Ltd.",
    location: "Colombo",
  },
  {
    id: "MIL002",
    name: "Traditional Mill Co.",
    location: "Gampaha",
  },
  {
    id: "MIL003",
    name: "Premium Rice Mills",
    location: "Kandy",
  },
  {
    id: "MIL004",
    name: "Lanka Rice Processing",
    location: "Kurunegala",
  },
];

// Wholesalers list for selection (for Miller)
export const wholesalers = [
  {
    id: "WHL001",
    name: "National Distributors",
    location: "Kandy",
  },
  {
    id: "WHL002",
    name: "Lanka Wholesale Traders",
    location: "Colombo",
  },
  {
    id: "WHL003",
    name: "Premium Rice Distributors",
    location: "Galle",
  },
  {
    id: "WHL004",
    name: "Island Rice Supply",
    location: "Negombo",
  },
];

// Retailers list for selection (for Wholesaler)
export const retailers = [
  {
    id: "RET001",
    name: "City Super Market",
    location: "Colombo",
  },
  {
    id: "RET002",
    name: "Village Store",
    location: "Matara",
  },
  {
    id: "RET003",
    name: "Metro Grocery",
    location: "Kandy",
  },
  {
    id: "RET004",
    name: "Fresh Market",
    location: "Galle",
  },
];

// All users for admin view
export const allUsers = {
  FRM001: {
    role: "farmer",
    name: "Bandara Mudiyanselage",
    id: "FRM001",
    location: "Polonnaruwa",
  },
  FRM002: {
    role: "farmer",
    name: "Sunil Perera",
    id: "FRM002",
    location: "Anuradhapura",
  },
  COL001: {
    role: "collector",
    name: "Central Collector Co.",
    id: "COL001",
    location: "Kurunegala",
  },
  COL002: {
    role: "collector",
    name: "Eastern Transport & Collectors",
    id: "COL002",
    location: "Batticaloa",
  },
  MIL001: {
    role: "miller",
    name: "Modern Rice Mill Ltd.",
    id: "MIL001",
    location: "Colombo",
  },
  MIL002: {
    role: "miller",
    name: "Traditional Mill Co.",
    id: "MIL002",
    location: "Gampaha",
  },
  WHL001: {
    role: "wholesaler",
    name: "National Distributors",
    id: "WHL001",
    location: "Kandy",
  },
  WHL002: {
    role: "wholesaler",
    name: "Lanka Wholesale Traders",
    id: "WHL002",
    location: "Colombo",
  },
  RET001: {
    role: "retailer",
    name: "City Super Market",
    id: "RET001",
    location: "Colombo",
  },
  RET002: {
    role: "retailer",
    name: "Village Store",
    id: "RET002",
    location: "Matara",
  },
};
