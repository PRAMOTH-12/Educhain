const { expect } = require("chai");
const { ethers } = require("hardhat");
const stringify = require("json-stable-stringify");

describe("EduChain full lifecycle", function () {
  it("register -> issue -> verify -> revoke", async function () {
    const [admin, university, other] = await ethers.getSigners();

    // Deploy DIDRegistry
    const DID = await ethers.getContractFactory("DIDRegistry");
    const did = await DID.deploy();
    await did.deployed();

    // Register university (admin does it)
    const issuerDID = "did:university:msec";
    await did.connect(admin).registerUniversity(issuerDID, "MSEC", university.address);

    // Deploy CredentialRegistry
    const Cred = await ethers.getContractFactory("CredentialRegistry");
    const cred = await Cred.deploy(did.address);
    await cred.deployed();

    // Build VC and root
    const vc = {
      issuer: issuerDID,
      credentialSubject: { id: "did:student:1", name: "Pramoth" }
    };
    const canonical = stringify(vc);
    const root = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(canonical));

    // Issue
    await cred.connect(university).storeCredential(root, issuerDID);

    // Verify stored
    const rec = await cred.getCredential(root);
    expect(rec[0]).to.equal(root);
    expect(rec[1]).to.equal(issuerDID);
    expect(rec[2]).to.equal(false);

    // Revoke
    await cred.connect(university).revokeCredential(root);
    const rec2 = await cred.getCredential(root);
    expect(rec2[2]).to.equal(true);
  });
});
