const express = require("express");
const { ethers } = require("ethers");
const { create } = require("ipfs-http-client");
require("dotenv").config();
const path = require("path");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(express.json()); // <-- ensures req.body is parsed

// -------------------- IPFS CONFIG --------------------
const ipfs = create({ url: "http://127.0.0.1:5001" });

// -------------------- BLOCKCHAIN CONFIG --------------------
const rpcUrl = "http://127.0.0.1:8545"; // Local Hardhat node
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) throw new Error("❌ PRIVATE_KEY not set in .env");

const credentialAddress = process.env.CREDENTIAL_REGISTRY_ADDRESS;
const didAddress = process.env.DID_REGISTRY_ADDRESS;

if (!credentialAddress || !didAddress)
  throw new Error("❌ Contract addresses not set in .env");

// Load ABIs
const credentialABI = require(path.join(
  __dirname,
  "../blockchain/artifacts/contracts/CredentialRegistry.sol/CredentialRegistry.json"
)).abi;

const didABI = require(path.join(
  __dirname,
  "../blockchain/artifacts/contracts/DIDRegistry.sol/DIDRegistry.json"
)).abi;

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const credentialContract = new ethers.Contract(
  credentialAddress,
  credentialABI,
  wallet
);

const didContract = new ethers.Contract(didAddress, didABI, wallet);

console.log("✅ Using CredentialRegistry at:", credentialAddress);
console.log("✅ Using DIDRegistry at:", didAddress);

// -------------------- ISSUE CREDENTIAL --------------------
app.post("/issue-credential", async (req, res) => {
  try {
    const { studentDID, issuerDID, credentialData } = req.body;

    if (!studentDID || !issuerDID || !credentialData)
      return res.status(400).json({ error: "Missing fields in request" });

    // Upload to IPFS
    const jsonData = JSON.stringify(credentialData);
    const { cid } = await ipfs.add(jsonData);
    const ipfsCid = cid.toString();

    // Hash credentialData for on-chain storage
    const hash = ethers.keccak256(ethers.toUtf8Bytes(jsonData));

    console.log("📌 Issuing credential with hash:", hash);

    // Call smart contract
    const tx = await credentialContract.issueCredential(
      hash,
      studentDID,
      issuerDID,
      ipfsCid
    );
    await tx.wait();

    res.json({
      success: true,
      message: "✅ Credential issued successfully",
      credentialCID: ipfsCid,
      hash,
    });
  } catch (error) {
    console.error("❌ Error issuing credential:", error);
    res.status(500).json({ error: "Credential issuance failed", details: error.message });
  }
});

// -------------------- VERIFY CREDENTIAL --------------------
app.post("/verify-credential", async (req, res) => {
  try {
    const { credentialData } = req.body;

    if (!credentialData)
      return res.status(400).json({ error: "Missing credentialData" });

    const jsonData = JSON.stringify(credentialData);
    const hash = ethers.keccak256(ethers.toUtf8Bytes(jsonData));

    const valid = await credentialContract.verifyCredential(hash);

    if (valid) {
      res.json({ success: true, message: "✅ Verification successful", hash });
    } else {
      res.status(400).json({ success: false, error: "Verification failed" });
    }
  } catch (error) {
    console.error("❌ Error verifying credential:", error);
    res.status(500).json({ error: "Verification failed", details: error.message });
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 EduChain backend running on http://localhost:${PORT}`)
);
