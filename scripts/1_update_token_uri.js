const {ethers} = require('hardhat');
const Example = require('../artifacts/contracts/Example.sol/Example.json');

// If we need to change tokenURI manually, we can use this script
async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const owner = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);

    // PIANO
    const contractAddress = ''; /* TODO: Address of the contract */
    const contract = new ethers.Contract(contractAddress, Example.abi, provider);

    for (let i = 0; i < 0; i++) {
        console.log(`setToken ${i}`);
        const txSetTokenURI = await contract.connect(owner).setTokenURI(i, 'ipfs://', {  /* TODO: IPFS link */
                maxFeePerGas: BigInt('200000000000'),
                maxPriorityFeePerGas: BigInt('200000000000'),
            })
        ;
        await txSetTokenURI.wait();
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

