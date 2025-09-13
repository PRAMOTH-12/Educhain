const { ethers } = require("hardhat");
require("dotenv").config();
const path = require("path");

async function main() {
  const rpcUrl = "http://127.0.0.1:8545"; // Local Hardhat
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Please set PRIVATE_KEY in .env");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Correct path: go up one folder from scripts to blockchain/artifacts
  const didABI = require(path.join(
    __dirname,
    "../artifacts/contracts/DIDRegistry.sol/DIDRegistry.json"
  )).abi;

  const didAddress = process.env.DID_REGISTRY_ADDRESS;
  if (!didAddress) {
    throw new Error("Please set DID_REGISTRY_ADDRESS in .env");
  }

  const didContract = new ethers.Contract(didAddress, didABI, wallet);

  // Replace with your actual DID info
  const tx = await didContract.registerUniversity(
    "did:example:university",
    "Example University",
    wallet.address,
    "university@example.com",
    "https://example.edu"
  );
  await tx.wait();

  console.log("✅ Issuer DID registered");
}

main().catch(err => {
  console.error("❌ Error:", err);
});
