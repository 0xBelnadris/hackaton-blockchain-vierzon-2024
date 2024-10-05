const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {deployFixture} = require("./fixture");
const {expect} = require("chai");

describe("Mint token", function () {
    it("Mint token (Owner)", async () => {
        const {
            owner,
            firstAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);


        await example.connect(owner).safeMint(metadataUri, firstAccount);
        expect(await example.ownerOf(0)).to.equal(firstAccount.address);
        expect(await example.tokenURI(0)).to.equal('{metadataUri}');

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        expect(await example.ownerOf(1)).to.equal(firstAccount.address);
        expect(await example.tokenURI(1)).to.equal('{metadataUri}');
    });

    it("Mint token (Minter)", async () => {
        const {
            minter,
            firstAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);


        await example.connect(minter).safeMint(metadataUri, firstAccount);
        expect(await example.ownerOf(0)).to.equal(firstAccount.address);
        expect(await example.tokenURI(0)).to.equal('{metadataUri}');
    });

    it("Mint 1 token after contract ownership transfered", async () => {
        const {
            owner,
            firstAccount,
            thirdAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).transferOwnership(thirdAccount.address);
        await expect(example.connect(owner).safeMint(metadataUri, firstAccount)).to.be.revertedWith("Don't have the right role (MINTER_ROLE or DEFAULT_ADMIN_ROLE))");

        await example.connect(thirdAccount).safeMint(metadataUri, firstAccount);
        expect(await example.ownerOf(0)).to.equal(firstAccount.address);
        expect(await example.tokenURI(0)).to.equal('{metadataUri}');
    });

    it("User can transfer his token", async () => {
        const {
            owner,
            firstAccount,
            secondAccount,
            example,
            metadataUri
        } = await loadFixture(deployFixture);

        await example.connect(owner).safeMint(metadataUri, firstAccount);
        await example.connect(firstAccount).transferFrom(firstAccount, secondAccount, 0);
    });
});