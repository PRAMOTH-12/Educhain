
 📘 EduChain – Blockchain Based Student Credential Verification

EduChain is a *blockchain + IPFS powered platform* for secure, tamper-proof student credential management.
Universities can issue digital transcripts, students can store/share them, and employers can verify instantly.

 🚀 Problem Statement

* Fake certificates are common.
* Manual verification is *slow and costly*.
* No global standard for trusted digital transcripts.


🎯 Solution

* University issues credentials → Stored on *IPFS* (decentralized).
* hash of transcript stored on *Blockchain* (immutable proof).
* Student wallet web app allows  sharing with employers.
* Employers verify by comparing IPFS file hash with Blockchain hash.


🛠 Tech Stack

Blockchain

* Hardhat (local Ethereum dev environment)
* Solidity Smart Contract (CredentialRegistry.sol)

Backend

* Node.js + Express.js
* MongoDB (credential metadata + audit logs)
* IPFS (credential storage)

Frontend

* *University/Employer Web App* → React.js
* *Student Wallet web App* → React

---

⚙ Project Setup

1️⃣ Blockchain (Hardhat)

bash
cd blockchain
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost


Smart Contract Functions:

* issueCredential(studentId, credentialHash)
* getCredentialHash(studentId)

---

2️⃣ Backend (Node.js + MongoDB + IPFS)

bash
cd backend
npm init -y
npm install express mongoose cors body-parser ethers ipfs-http-client dotenv


Run MongoDB:

bash
mongod --dbpath ~/data/db


Start backend:

bash
node server.js


---

3️⃣ Frontend (React – Web App)

bash
cd educhain-frontend
npm install
npm start


4️⃣ Student Wallet web app (React)

bash
cd wallet
npm install
npx  start


---

📂 Database Models

 Credential

js
studentId
credentialCID   // From IPFS
issuedAt
fieldsShared    // JSON of fields


Audit Log

js
studentId
employerId
timestamp
fieldsShared
status   // Verified / Failed


---

🔄 Workflow

1. *University Issues Credential*

   * Uploads transcript → stored in *IPFS* → gets CID.
   * Transcript *SHA-256 hash* stored on Blockchain.
   * Metadata stored in MongoDB.

2. *Student Wallet*

   * Fetches credentials linked to their ID.
   * Can share selective fields.

3. *Employer Verification*

   * Scans QR / link from student.
   * Fetches transcript from IPFS via CID.
   * Re-hashes file → compares with Blockchain hash.
   * ✅ Match = Valid | ❌ Mismatch = Fake.

---

🔐 Security Features

*  hashing → ensures tamper-proof credentials.
* *Blockchain immutability* → trusted verification.
* *IPFS storage* → decentralized & scalable.
* *Selective disclosure* → students control data sharing.
* *Audit logs* → track verification history.

---

📈 Future Scope

* AI-powered career recommendations.
* Multi-university integration.
* Deploy to Ethereum testnet/mainnet.
* Use Vultr/IPFS cloud nodes for scalability.

---

