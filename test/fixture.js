const {ethers} = require('hardhat');

async function deployFixture() {
    const [
        owner,
        minter,
        firstAccount,
        secondAccount,
        thirdAccount
    ] = await ethers.getSigners();

    const ExampleFactory = await ethers.getContractFactory('Example');
    const example = await ExampleFactory.deploy(owner.address, minter.address);

    return {
        owner: owner,
        minter: minter,
        firstAccount,
        secondAccount,
        thirdAccount,
        example: example,
        metadataUri: '{metadataUri}',
    };
}

module.exports = {
    deployFixture: deployFixture
};