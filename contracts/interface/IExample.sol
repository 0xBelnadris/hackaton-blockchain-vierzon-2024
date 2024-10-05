// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

interface IExample {
    function safeMint(string calldata tokenUri, address to) external returns (uint256);

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external;

    function transferOwnership(address newAddress) external;
}