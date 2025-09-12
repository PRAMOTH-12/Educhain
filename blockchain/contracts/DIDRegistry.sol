// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DIDRegistry is AccessControl {
    bytes32 public constant UNIVERSITY_ROLE = keccak256("UNIVERSITY_ROLE");

    struct Univ {
        string name;
        address adminAddr;
        string email;
        string website;
        bool isActive;
    }

    mapping(string => Univ) private universities;

    event UniversityRegistered(string did, string name, address adminAddr, string email, string website);
    event UniversityStatusUpdated(string did, bool isActive);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyActive(string calldata did) {
        require(universities[did].isActive, "University not active");
        _;
    }

    function registerUniversity(
        string calldata did,
        string calldata name,
        address adminAddr,
        string calldata email,
        string calldata website
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        universities[did] = Univ(name, adminAddr, email, website, true);
        _grantRole(UNIVERSITY_ROLE, adminAddr);
        emit UniversityRegistered(did, name, adminAddr, email, website);
    }

    function setActive(string calldata did, bool active) external onlyRole(DEFAULT_ADMIN_ROLE) {
        universities[did].isActive = active;
        emit UniversityStatusUpdated(did, active);
    }

    function checkUniversityValid(string calldata did) external view returns (bool) {
        Univ storage u = universities[did];
        return (u.adminAddr != address(0) && u.isActive);
    }

    function getUniversityAdmin(string calldata did) external view returns (address) {
        return universities[did].adminAddr;
    }

    function getUniversity(string calldata did)
        external
        view
        returns (string memory, address, string memory, string memory, bool)
    {
        Univ storage u = universities[did];
        return (u.name, u.adminAddr, u.email, u.website, u.isActive);
    }
}
