// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

interface IDIDRegistry {
    function getUniversityAdmin(string calldata did) external view returns (address);
    function checkUniversityValid(string calldata did) external view returns (bool);
}

contract CredentialRegistry is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Credential {
        bytes32 hash;
        string issuerDID;
        bool revoked;
        uint256 issuedAt;
        string ipfsCID; // optional off-chain storage
    }

    mapping(bytes32 => Credential) private credentials;
    IDIDRegistry public didRegistry;

    event CredentialIssued(bytes32 indexed hash, string studentDID, string issuerDID, uint256 issuedAt);
    event CredentialRevoked(bytes32 indexed hash);

    constructor(address didRegistryAddress) {
        didRegistry = IDIDRegistry(didRegistryAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function issueCredential(bytes32 hash, string calldata studentDID, string calldata issuerDID, string calldata ipfsCID) external {
        require(didRegistry.checkUniversityValid(issuerDID), "Issuer not valid");
        address issuerAdmin = didRegistry.getUniversityAdmin(issuerDID);
        require(msg.sender == issuerAdmin, "Not authorized to issue credential");
        require(credentials[hash].hash == bytes32(0), "Credential already exists");

        credentials[hash] = Credential(hash, issuerDID, false, block.timestamp, ipfsCID);
        emit CredentialIssued(hash, studentDID, issuerDID, block.timestamp);
    }

    function revokeCredential(bytes32 hash) external {
        Credential storage c = credentials[hash];
        require(c.hash != bytes32(0), "Credential not found");
        address issuerAdmin = didRegistry.getUniversityAdmin(c.issuerDID);
        require(msg.sender == issuerAdmin || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");

        c.revoked = true;
        emit CredentialRevoked(hash);
    }

    function verifyCredential(bytes32 hash) external view returns (bool) {
        Credential storage c = credentials[hash];
        return (c.hash != bytes32(0) && !c.revoked);
    }

    function getCredential(bytes32 hash) external view returns (Credential memory) {
        return credentials[hash];
    }
}
