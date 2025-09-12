const stringify = require("json-stable-stringify");
const fs = require("fs");

async function main() {
  const CRED_ADDR = "PASTE_CREDENTIAL_REGISTRY_ADDRESS_HERE";
  const credAbi = require("../artifacts/contracts/CredentialRegistry.sol/CredentialRegistry.json").abi;
  const cred = await ethers.getContractAt("CredentialRegistry", CRED_ADDR);

  const vc = JSON.parse(fs.readFileSync("examples/sample-vc.json", "utf8"));
  const canonical = stringify(vc);
  const root = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(canonical));

  const record = await cred.getCredential(root);
  console.log("On-chain record:", record); // (root, issuerDID, revoked)
}

main().catch(console.error);
