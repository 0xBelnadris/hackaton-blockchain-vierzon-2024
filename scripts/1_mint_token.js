const {ethers} = require('hardhat');
const Example = require('../artifacts/contracts/Example.sol/Example.json');

async function main() {
    const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
    const owner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);

    const contractAddress = '0x8De08A2CE86F838416c509499802c906F492D030'; /* TODO: Address of the contract */
    const contract = new ethers.Contract(contractAddress, Example.abi, provider);

    const txSetTokenURI = await contract.connect(owner).safeMint('ipfs://bafybeihpy6mthwq7zmyuvuliwelr37rolykwmrgzvllzisykg3qstw4koe', '0xab672B437AEbE6A547d27e3b11bF7d32a551BB73');
    await txSetTokenURI.wait();

    console.log('NFT minted and tokenURI set');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

