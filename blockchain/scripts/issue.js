const stringify = require("json-stable-stringify");
const fs = require("fs");

async function main() {
  const [admin, university] = await ethers.getSigners();

  const CRED_ADDR = "PASTE_CREDENTIAL_REGISTRY_ADDRESS_HERE";
  const credAbi = require("../artifacts/contracts/CredentialRegistry.sol/CredentialRegistry.json").abi;
  const cred = new ethers.Contract(CRED_ADDR, credAbi, university);

  // Load VC JSON from file (prepare examples/sample-vc.json)
  const vc = JSON.parse(fs.readFileSync("examples/sample-vc.json", "utf8"));
  const canonical = stringify(vc);
  const root = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(canonical));

  const tx = await cred.connect(university).storeCredential(root, vc.issuer);
  await tx.wait();
  console.log("Issued credential root:", root);
}

main().catch(console.error);
