const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// ---------------- Connect to local Hardhat network ----------------
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Hardhat default

// ---------------- Load contract ABIs ----------------
const didRegistryAbi = JSON.parse(fs.readFileSync(path.join(__dirname, "artifacts/contracts/DIDRegistry.sol/DIDRegistry.json"), "utf8")).abi;
const credentialRegistryAbi = JSON.parse(fs.readFileSync(path.join(__dirname, "artifacts/contracts/CredentialRegistry.sol/CredentialRegistry.json"), "utf8")).abi;

// ---------------- Set deployed contract addresses ----------------
const DID_REGISTRY_ADDRESS = "DID_REGISTRY_ADDRESS";
const CREDENTIAL_REGISTRY_ADDRESS = "CREDENTIAL_REGISTRY_ADDRESS";

// ---------------- Signer (for issuing credentials) ----------------
const signer = provider.getSigner(0);

// ---------------- Contract instances ----------------
const didRegistry = new ethers.Contract(DID_REGISTRY_ADDRESS, didRegistryAbi, signer);
const credentialRegistry = new ethers.Contract(CREDENTIAL_REGISTRY_ADDRESS, credentialRegistryAbi, signer);

module.exports = { provider, signer, didRegistry, credentialRegistry };
