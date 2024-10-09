const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const supplyChainAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with your deployed address
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    const supplyChain = SupplyChain.attach(supplyChainAddress);

    // Create an item
    const createTx = await supplyChain.createItem("Item 1");
    await createTx.wait();
    console.log("Item created");

    // Mark item in transit
    const transitTx = await supplyChain.markInTransit(1);
    await transitTx.wait();
    console.log("Item marked in transit");

    // Mark item delivered
    const deliverTx = await supplyChain.markDelivered(1);
    await deliverTx.wait();
    console.log("Item marked as delivered");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
