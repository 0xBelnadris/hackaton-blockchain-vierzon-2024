const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {deployFixture} = require("./fixture");
const {expect} = require("chai");

describe("Contract creation", function () {

    it("should have set the right data", async () => {
        const {
            owner,
            example
        } = await loadFixture(deployFixture);

        expect(await example.owner()).to.equal(owner.address);
        expect(await example)
    });
});