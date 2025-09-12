const fs = require("fs");
const stringify = require("json-stable-stringify");
const { ethers } = require("hardhat");

if (process.argv.length < 3) {
  console.error("Usage: node scripts/hash-vc.js path/to/vc.json");
  process.exit(1);
}

const file = process.argv[2];
const json = JSON.parse(fs.readFileSync(file, "utf8"));
const canonical = stringify(json);
const root = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(canonical));

console.log("Canonical JSON:");
console.log(canonical);
console.log("keccak256 root:", root);
