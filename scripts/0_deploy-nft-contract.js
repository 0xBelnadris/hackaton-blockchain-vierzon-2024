const {ethers} = require("hardhat");

async function main() {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const minterAddress = process.env.MINTER_ADDRESS;

    const ExampleFactory = await ethers.getContractFactory("Example");
    const Example = await ExampleFactory.deploy(ownerAddress, minterAddress);

    console.log(
        `Example deployed to ${await Example.getAddress()}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
