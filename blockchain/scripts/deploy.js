const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
  const didRegistry = await DIDRegistry.deploy();
  await didRegistry.waitForDeployment();
  console.log("DIDRegistry deployed to:", didRegistry.target);

  const CredentialRegistry = await ethers.getContractFactory("CredentialRegistry");
  const credentialRegistry = await CredentialRegistry.deploy(didRegistry.target);
  await credentialRegistry.waitForDeployment();
  console.log("CredentialRegistry deployed to:", credentialRegistry.target);

  console.log("Deployment complete. Save these addresses for frontend/backend.");
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
