const contractABI = [
    // Your contract ABI goes here
    {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
          }
        ],
        "name": "createItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "itemCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "items",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
];

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById('addItemForm').onsubmit = async function (event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemCreated = new Date(document.getElementById('itemCreated').value).getTime() / 1000; // Convert to Unix timestamp

    const accounts = await web3.eth.getAccounts();
    await contract.methods.createItem(itemName, itemPrice, itemQuantity, itemCreated).send({ from: accounts[0] });
    
    fetchItems(); // Refresh the item list after adding
};

async function fetchItems() {
    const itemCount = await contract.methods.itemCount().call();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear existing items

    for (let i = 1; i <= itemCount; i++) {
        const item = await contract.methods.items(i).call();
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Created At: ${new Date(item.createdAt * 1000).toLocaleString()}`;
        itemList.appendChild(listItem);
    }
}

// Open inventory in a new tab
document.getElementById('viewItemsButton').onclick = function () {
    window.open('http://localhost:8000', '_blank');
};

// Initial fetch of items
window.onload = fetchItems;