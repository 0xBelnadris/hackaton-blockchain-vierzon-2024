const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {deployFixture} = require("./fixture");
const {expect} = require("chai");

describe("Burn token", function () {
    it("Owner burn his token", async () => {
        const {
            owner,
            firstAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        await example.connect(firstAccount).burn(0);
        await expect(example.ownerOf(0)).to.be.revertedWith("ERC721: invalid token ID");
    });

    it("User can mint after a burn", async () => {
        const {
            owner,
            firstAccount,
            secondAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        await example.connect(firstAccount).burn(0);
        await expect(example.ownerOf(0)).to.be.revertedWith("ERC721: invalid token ID");

        await example.connect(owner).safeMint(metadataUri, secondAccount);
        expect(await example.ownerOf(1)).to.equal(secondAccount.address);
    });

    it("User can mint again after a burn", async () => {
        const {
            owner,
            firstAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        await example.connect(firstAccount).burn(0);
        await expect(example.ownerOf(0)).to.be.revertedWith("ERC721: invalid token ID");

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        expect(await example.ownerOf(1)).to.equal(firstAccount.address);    });

    it("Only owner can bur his token", async () => {
        const {
            owner,
            firstAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        await expect(example.connect(owner).burn(0)).to.be.revertedWith("ERC721: caller is not token owner or approved");
    });
});