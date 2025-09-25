// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crud {
    uint256 public nextId;

    struct Item {
        uint256 id;
        string name;
        string data;
        bool exists;
    }

    mapping(uint256 => Item) public items;
    uint256[] public ids;

    event ItemCreated(uint256 indexed id, string name, string data);
    event ItemUpdated(uint256 indexed id, string name, string data);
    event ItemDeleted(uint256 indexed id);

    constructor() {
        nextId = 1;
    }

    function createItem(string memory name, string memory data) public returns (uint256) {
        uint256 id = nextId++;
        items[id] = Item(id, name, data, true);
        ids.push(id);
        emit ItemCreated(id, name, data);
        return id;
    }

    function readItem(uint256 id) public view returns (uint256, string memory, string memory, bool) {
        Item storage it = items[id];
        return (it.id, it.name, it.data, it.exists);
    }

    function updateItem(uint256 id, string memory name, string memory data) public {
        require(items[id].exists, "Item does not exist");
        items[id].name = name;
        items[id].data = data;
        emit ItemUpdated(id, name, data);
    }

    function deleteItem(uint256 id) public {
        require(items[id].exists, "Item does not exist");
        items[id].exists = false;
        emit ItemDeleted(id);
    }

    function getAllIds() public view returns (uint256[] memory) {
        return ids;
    }
}
