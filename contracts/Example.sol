// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interface/IExample.sol";

/// @custom:security-contact security@kreypt.art
contract Example is ERC721URIStorage, ERC721Burnable, ERC2981, AccessControl, ReentrancyGuard, IExample {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor(address _owner, address _minter) ERC721("Example", "EXAM") {
        owner = _owner;
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        _setupRole(MINTER_ROLE, _minter);
    }

    /*
        @notice Mint NFT
        @param tokenUri : The token uri
        @param to : The address where to send the NFT
        @return tokenId : The token id
    */
    function safeMint(string calldata tokenUri, address to)public override returns (uint256)   {
        require(hasRole(MINTER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Don't have the right role (MINTER_ROLE or DEFAULT_ADMIN_ROLE))");
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        _tokenIdCounter.increment();
        return tokenId;
    }

    /*
        @notice Set token uri
        @param tokenId : The token id
        @param _tokenURI : The token uri
    */
    function setTokenURI(uint256 tokenId, string memory _tokenURI) onlyRole(DEFAULT_ADMIN_ROLE) external virtual override {
        super._setTokenURI(tokenId, _tokenURI);
    }

    /*
        @notice Transfert smart contract ownership
        @param newAddress : New owner address
    */
    function transferOwnership(address newAddress) override(IExample) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newAddress != address(0), "Invalid Address");
        _revokeRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(DEFAULT_ADMIN_ROLE, newAddress);
        owner = newAddress;
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage, ERC2981, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || ERC721URIStorage.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId)  || AccessControl.supportsInterface(interfaceId);
    }
}