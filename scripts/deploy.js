const { ethers } = require("hardhat");

async function main() {
    // Get the signer (deployer)
    const [deployer] = await ethers.getSigners();

    // Deploy the SupplyChain contract
    const contractFlashRaw = await ethers.deployContract("SupplyChain", {
        from: deployer.address,
    });

    // Wait for the deployment to complete
    await contractFlashRaw.waitForDeployment();

    // Log the deployed contract address
    console.log("SupplyChain deployed to:", contractFlashRaw.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
