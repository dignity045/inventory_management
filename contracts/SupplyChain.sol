// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Item {
        uint id;
        string name;
        uint price;
        uint quantity;
        uint createdAt;
        address owner;
    }

    mapping(uint => Item) public items;
    uint public itemCount;

    function createItem(string memory _name, uint _price, uint _quantity) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, _quantity, block.timestamp, msg.sender);
    }
}
