const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {deployFixture} = require("./fixture");
const {expect} = require("chai");


describe("Transfert ownership", function () {
    it("Test revert not rights", async () => {

        const {
            owner,
            firstAccount,
            example
        } = await loadFixture(deployFixture);
        const adminRole = await example.DEFAULT_ADMIN_ROLE();
        await expect(example.connect(firstAccount).transferOwnership(owner.address)).to.be.revertedWith("AccessControl: account " + firstAccount.address.toLowerCase() + " is missing role " + adminRole);
      });

    it("Ownership transfered", async () => {
        const {
            owner,
            firstAccount,
            example
        } = await loadFixture(deployFixture);
        const adminRole = await example.DEFAULT_ADMIN_ROLE();

        await expect(example.connect(owner).transferOwnership(firstAccount.address));
    });
});