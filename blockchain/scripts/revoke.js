async function main() {
  const [admin, university] = await ethers.getSigners();

  const CRED_ADDR = "PASTE_CREDENTIAL_REGISTRY_ADDRESS_HERE";
  const cred = await ethers.getContractAt("CredentialRegistry", CRED_ADDR);

  // copy root printed earlier from issue step
  const root = "PASTE_ROOT_HERE";

  const tx = await cred.connect(university).revokeCredential(root);
  await tx.wait();
  console.log("Revoked credential:", root);
}
main().catch(console.error);
