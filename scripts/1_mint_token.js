const {ethers} = require('hardhat');
const Example = require('../artifacts/contracts/Example.sol/Example.json');

// If we need to change tokenURI manually, we can use this script
async function main() {
    const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
    const owner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);

    // PIANO
    const contractAddress = '0x8De08A2CE86F838416c509499802c906F492D030'; /* TODO: Address of the contract */
    const contract = new ethers.Contract(contractAddress, Example.abi, provider);

    const txSetTokenURI = await contract.connect(owner).safeMint('ipfs://bafybeibulyuw4qmptj3z4kujjh2w5677xx3eizwydz2yao3nnrt7fhsnlq/1000.json', '0x0b1De2495d78C65eC7e0C3978BC625b019360F11');
    await txSetTokenURI.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

