async function main() {
  // Admin (deployer) registers a university DID and maps to a university wallet
  const [admin, university] = await ethers.getSigners();

  const DIDAddr = "PASTE_DID_REGISTRY_ADDRESS_HERE"; // fill after deploy
  const DID = await ethers.getContractFactory("DIDRegistry");
  const did = DID.attach(DIDAddr);

  const didString = "did:university:msec"; // example DID
  const tx = await did.connect(admin).registerUniversity(didString, "MSEC", university.address);
  await tx.wait();
  console.log("Registered:", didString, "->", university.address);
}

main().catch(console.error);
