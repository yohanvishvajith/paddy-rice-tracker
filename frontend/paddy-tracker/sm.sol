// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RiceSupplyChain {
    address public owner;
    
    // Entity types enum
    enum EntityType { Farmer, Collector, Miller, WholeSaler, Retailer }
    enum PaddyType { Basmati, Jasmine, LongGrain, ShortGrain, Other }
    enum RiceType { White, Brown, Parboiled, Organic, Other }
    
    // Farmer struct
    struct Farmer {
        string farmerId;
        string nic;
        string fullName;
        string homeAddress;
        string district;
        string contactNumber;
        uint256 totalAreaOfPaddyLand;
        bool isRegistered;
    }
    
    // Collector struct
    struct Collector {
        string collectorId;
        string nic;
        string name;
        string collectorAddress;
        string district;
        string contactNumber;
        bool isRegistered;
    }
    
    // Miller struct
    struct Miller {
        string millerId;
        string companyRegisterNumber;
        string companyName;
        string millerAddress;
        string district;
        string contactNumber;
        bool isRegistered;
    }
    
    // WholeSaler struct
    struct WholeSaler {
        string wholeSalerId;
        string companyRegisterId;
        string district;
        string wholeSalerAddress;
        string contactNumber;
        bool isRegistered;
    }
    
    // Retailer struct
    struct Retailer {
        string retailerId;
        string name;
        string district;
        string retailerAddress;
        string contactNumber;
        bool isRegistered;
    }
    
    // Transaction structs for supply chain flow
    struct FarmerToCollectorTransaction {
        string transactionId;
        string farmerId;
        string collectorId;
        uint256 quantity; // in kg
        PaddyType paddyType;
        uint256 dateTime;
        uint256 pricePerKg;
        bool isCompleted;
    }
    
    struct CollectorToMillerTransaction {
        string transactionId;
        string collectorId;
        string millerId;
        uint256 quantity; // in kg
        PaddyType paddyType;
        uint256 dateTime;
        uint256 pricePerKg;
        bool isCompleted;
    }
    
    struct MillerToWholeSalerTransaction {
        string transactionId;
        string millerId;
        string wholeSalerId;
        uint256 quantity; // in kg
        RiceType riceType;
        uint256 dateTime;
        uint256 pricePerKg;
        bool isCompleted;
    }
    
    struct WholeSalerToRetailerTransaction {
        string transactionId;
        string wholeSalerId;
        string retailerId;
        uint256 quantity; // in kg
        RiceType riceType;
        uint256 dateTime;
        uint256 pricePerKg;
        bool isCompleted;
    }
    
    // Mappings to store entities
    mapping(string => Farmer) public farmers;
    mapping(string => Collector) public collectors;
    mapping(string => Miller) public millers;
    mapping(string => WholeSaler) public wholeSalers;
    mapping(string => Retailer) public retailers;
    
    // Mappings to store transactions
    mapping(string => FarmerToCollectorTransaction) public farmerToCollectorTxns;
    mapping(string => CollectorToMillerTransaction) public collectorToMillerTxns;
    mapping(string => MillerToWholeSalerTransaction) public millerToWholeSalerTxns;
    mapping(string => WholeSalerToRetailerTransaction) public wholeSalerToRetailerTxns;
    
    // Arrays to keep track of all IDs
    string[] public farmerIds;
    string[] public collectorIds;
    string[] public millerIds;
    string[] public wholeSalerIds;
    string[] public retailerIds;
    
    // Transaction ID arrays
    string[] public farmerToCollectorTxnIds;
    string[] public collectorToMillerTxnIds;
    string[] public millerToWholeSalerTxnIds;
    string[] public wholeSalerToRetailerTxnIds;
    
    // Events
    event FarmerRegistered(string farmerId, string fullName);
    event CollectorRegistered(string collectorId, string name);
    event MillerRegistered(string millerId, string companyName);
    event WholeSalerRegistered(string wholeSalerId);
    event RetailerRegistered(string retailerId, string name);
    
    event FarmerToCollectorTransactionCreated(string transactionId, string farmerId, string collectorId, uint256 quantity);
    event CollectorToMillerTransactionCreated(string transactionId, string collectorId, string millerId, uint256 quantity);
    event MillerToWholeSalerTransactionCreated(string transactionId, string millerId, string wholeSalerId, uint256 quantity);
    event WholeSalerToRetailerTransactionCreated(string transactionId, string wholeSalerId, string retailerId, uint256 quantity);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Farmer registration and management functions
    function registerFarmer(
        string memory _farmerId,
        string memory _nic,
        string memory _fullName,
        string memory _homeAddress,
        string memory _district,
        string memory _contactNumber,
        uint256 _totalAreaOfPaddyLand
    ) public onlyOwner {
        require(!farmers[_farmerId].isRegistered, "Farmer already registered");
        
        farmers[_farmerId] = Farmer({
            farmerId: _farmerId,
            nic: _nic,
            fullName: _fullName,
            homeAddress: _homeAddress,
            district: _district,
            contactNumber: _contactNumber,
            totalAreaOfPaddyLand: _totalAreaOfPaddyLand,
            isRegistered: true
        });
        
        farmerIds.push(_farmerId);
        emit FarmerRegistered(_farmerId, _fullName);
    }
    
    // Collector registration
    function registerCollector(
        string memory _collectorId,
        string memory _nic,
        string memory _name,
        string memory _collectorAddress,
        string memory _district,
        string memory _contactNumber
    ) public onlyOwner {
        require(!collectors[_collectorId].isRegistered, "Collector already registered");
        
        collectors[_collectorId] = Collector({
            collectorId: _collectorId,
            nic: _nic,
            name: _name,
            collectorAddress: _collectorAddress,
            district: _district,
            contactNumber: _contactNumber,
            isRegistered: true
        });
        
        collectorIds.push(_collectorId);
        emit CollectorRegistered(_collectorId, _name);
    }
    
    // Miller registration
    function registerMiller(
        string memory _millerId,
        string memory _companyRegisterNumber,
        string memory _companyName,
        string memory _millerAddress,
        string memory _district,
        string memory _contactNumber
    ) public onlyOwner {
        require(!millers[_millerId].isRegistered, "Miller already registered");
        
        millers[_millerId] = Miller({
            millerId: _millerId,
            companyRegisterNumber: _companyRegisterNumber,
            companyName: _companyName,
            millerAddress: _millerAddress,
            district: _district,
            contactNumber: _contactNumber,
            isRegistered: true
        });
        
        millerIds.push(_millerId);
        emit MillerRegistered(_millerId, _companyName);
    }
    
    // WholeSaler registration
    function registerWholeSaler(
        string memory _wholeSalerId,
        string memory _companyRegisterId,
        string memory _district,
        string memory _wholeSalerAddress,
        string memory _contactNumber
    ) public onlyOwner {
        require(!wholeSalers[_wholeSalerId].isRegistered, "WholeSaler already registered");
        
        wholeSalers[_wholeSalerId] = WholeSaler({
            wholeSalerId: _wholeSalerId,
            companyRegisterId: _companyRegisterId,
            district: _district,
            wholeSalerAddress: _wholeSalerAddress,
            contactNumber: _contactNumber,
            isRegistered: true
        });
        
        wholeSalerIds.push(_wholeSalerId);
        emit WholeSalerRegistered(_wholeSalerId);
    }
    
    // Retailer registration
    function registerRetailer(
        string memory _retailerId,
        string memory _name,
        string memory _district,
        string memory _retailerAddress,
        string memory _contactNumber
    ) public onlyOwner {
        require(!retailers[_retailerId].isRegistered, "Retailer already registered");
        
        retailers[_retailerId] = Retailer({
            retailerId: _retailerId,
            name: _name,
            district: _district,
            retailerAddress: _retailerAddress,
            contactNumber: _contactNumber,
            isRegistered: true
        });
        
        retailerIds.push(_retailerId);
        emit RetailerRegistered(_retailerId, _name);
    }
    
    // Transaction functions
    function createFarmerToCollectorTransaction(
        string memory _transactionId,
        string memory _farmerId,
        string memory _collectorId,
        uint256 _quantity,
        PaddyType _paddyType,
        uint256 _pricePerKg
    ) public onlyOwner {
        require(farmers[_farmerId].isRegistered, "Farmer not registered");
        require(collectors[_collectorId].isRegistered, "Collector not registered");
        require(farmerToCollectorTxns[_transactionId].dateTime == 0, "Transaction ID already exists");
        
        farmerToCollectorTxns[_transactionId] = FarmerToCollectorTransaction({
            transactionId: _transactionId,
            farmerId: _farmerId,
            collectorId: _collectorId,
            quantity: _quantity,
            paddyType: _paddyType,
            dateTime: block.timestamp,
            pricePerKg: _pricePerKg,
            isCompleted: true
        });
        
        farmerToCollectorTxnIds.push(_transactionId);
        emit FarmerToCollectorTransactionCreated(_transactionId, _farmerId, _collectorId, _quantity);
    }
    
    function createCollectorToMillerTransaction(
        string memory _transactionId,
        string memory _collectorId,
        string memory _millerId,
        uint256 _quantity,
        PaddyType _paddyType,
        uint256 _pricePerKg
    ) public onlyOwner {
        require(collectors[_collectorId].isRegistered, "Collector not registered");
        require(millers[_millerId].isRegistered, "Miller not registered");
        require(collectorToMillerTxns[_transactionId].dateTime == 0, "Transaction ID already exists");
        
        collectorToMillerTxns[_transactionId] = CollectorToMillerTransaction({
            transactionId: _transactionId,
            collectorId: _collectorId,
            millerId: _millerId,
            quantity: _quantity,
            paddyType: _paddyType,
            dateTime: block.timestamp,
            pricePerKg: _pricePerKg,
            isCompleted: true
        });
        
        collectorToMillerTxnIds.push(_transactionId);
        emit CollectorToMillerTransactionCreated(_transactionId, _collectorId, _millerId, _quantity);
    }
    
    function createMillerToWholeSalerTransaction(
        string memory _transactionId,
        string memory _millerId,
        string memory _wholeSalerId,
        uint256 _quantity,
        RiceType _riceType,
        uint256 _pricePerKg
    ) public onlyOwner {
        require(millers[_millerId].isRegistered, "Miller not registered");
        require(wholeSalers[_wholeSalerId].isRegistered, "WholeSaler not registered");
        require(millerToWholeSalerTxns[_transactionId].dateTime == 0, "Transaction ID already exists");
        
        millerToWholeSalerTxns[_transactionId] = MillerToWholeSalerTransaction({
            transactionId: _transactionId,
            millerId: _millerId,
            wholeSalerId: _wholeSalerId,
            quantity: _quantity,
            riceType: _riceType,
            dateTime: block.timestamp,
            pricePerKg: _pricePerKg,
            isCompleted: true
        });
        
        millerToWholeSalerTxnIds.push(_transactionId);
        emit MillerToWholeSalerTransactionCreated(_transactionId, _millerId, _wholeSalerId, _quantity);
    }
    
    function createWholeSalerToRetailerTransaction(
        string memory _transactionId,
        string memory _wholeSalerId,
        string memory _retailerId,
        uint256 _quantity,
        RiceType _riceType,
        uint256 _pricePerKg
    ) public onlyOwner {
        require(wholeSalers[_wholeSalerId].isRegistered, "WholeSaler not registered");
        require(retailers[_retailerId].isRegistered, "Retailer not registered");
        require(wholeSalerToRetailerTxns[_transactionId].dateTime == 0, "Transaction ID already exists");
        
        wholeSalerToRetailerTxns[_transactionId] = WholeSalerToRetailerTransaction({
            transactionId: _transactionId,
            wholeSalerId: _wholeSalerId,
            retailerId: _retailerId,
            quantity: _quantity,
            riceType: _riceType,
            dateTime: block.timestamp,
            pricePerKg: _pricePerKg,
            isCompleted: true
        });
        
        wholeSalerToRetailerTxnIds.push(_transactionId);
        emit WholeSalerToRetailerTransactionCreated(_transactionId, _wholeSalerId, _retailerId, _quantity);
    }
    
    // View functions to get counts
    function getFarmerCount() public view returns (uint256) {
        return farmerIds.length;
    }
    
    function getCollectorCount() public view returns (uint256) {
        return collectorIds.length;
    }
    
    function getMillerCount() public view returns (uint256) {
        return millerIds.length;
    }
    
    function getWholeSalerCount() public view returns (uint256) {
        return wholeSalerIds.length;
    }
    
    function getRetailerCount() public view returns (uint256) {
        return retailerIds.length;
    }
    
    // Function to track supply chain for a specific product
    function getSupplyChainHistory(string memory _transactionId) public view returns (
        bool found,
        string memory stage,
        string memory details
    ) {
        // Check in farmer to collector transactions
        if (farmerToCollectorTxns[_transactionId].dateTime != 0) {
            return (true, "Farmer to Collector", "Paddy transaction completed");
        }
        
        // Check in collector to miller transactions
        if (collectorToMillerTxns[_transactionId].dateTime != 0) {
            return (true, "Collector to Miller", "Paddy processing transaction completed");
        }
        
        // Check in miller to wholesaler transactions
        if (millerToWholeSalerTxns[_transactionId].dateTime != 0) {
            return (true, "Miller to WholeSaler", "Rice distribution transaction completed");
        }
        
        // Check in wholesaler to retailer transactions
        if (wholeSalerToRetailerTxns[_transactionId].dateTime != 0) {
            return (true, "WholeSaler to Retailer", "Final retail transaction completed");
        }
        
        return (false, "Not Found", "Transaction not found in supply chain");
    }
    
    // Function to change contract owner
    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    

    
}