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

    struct Order {
        uint id;
        uint itemId;
        uint quantity;
        address buyer;
        bool fulfilled;
        uint createdAt;
    }

    mapping(uint => Item) public items;
    mapping(uint => Order) public orders;
    uint public itemCount;
    uint public orderCount;

    event ItemCreated(uint id, string name, uint price, uint quantity, address owner);
    event ItemUpdated(uint id, string name, uint price, uint quantity);
    event ItemDeleted(uint id);
    event ItemOrdered(uint id, uint quantity, address buyer);
    event OrderFulfilled(uint orderId);

    function createItem(string memory _name, uint _price, uint _quantity) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, _quantity, block.timestamp, msg.sender);
        emit ItemCreated(itemCount, _name, _price, _quantity, msg.sender);
    }

    function updateItem(uint _id, string memory _name, uint _price, uint _quantity) public {
        require(_id > 0 && _id <= itemCount, "Item does not exist.");
        Item storage item = items[_id];
        item.name = _name;
        item.price = _price;
        item.quantity = _quantity;
        emit ItemUpdated(_id, _name, _price, _quantity);
    }

    function deleteItem(uint _id) public {
        require(_id > 0 && _id <= itemCount, "Item does not exist.");
        delete items[_id]; // Deletes the item from the mapping
        emit ItemDeleted(_id);
    }

    function orderItem(uint _id, uint _quantity) public payable {
        require(_id > 0 && _id <= itemCount, "Item does not exist.");
        Item storage item = items[_id];
        require(item.quantity >= _quantity, "Not enough items available.");
        require(msg.value >= item.price * _quantity, "Insufficient payment.");

        item.quantity -= _quantity; // Reduce the available quantity
        orderCount++;
        orders[orderCount] = Order(orderCount, _id, _quantity, msg.sender, false, block.timestamp);
        emit ItemOrdered(orderCount, _quantity, msg.sender);
    }

    function fulfillOrder(uint _orderId) public {
        require(_orderId > 0 && _orderId <= orderCount, "Order does not exist.");
        Order storage order = orders[_orderId];
        require(!order.fulfilled, "Order already fulfilled.");

        order.fulfilled = true;
        emit OrderFulfilled(_orderId);
    }

    function getOrderDetails(uint _orderId) public view returns (Order memory) {
        require(_orderId > 0 && _orderId <= orderCount, "Order does not exist.");
        return orders[_orderId];
    }
}
