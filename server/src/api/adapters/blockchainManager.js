const axios = require('axios');
const {ethers} = require('ethers');
const abi = require('../../resources/Example.json');

const DEFAULT_GAS_FEES = BigInt('140000000000');
const DEFAULT_GAS_PRIORITY_FEES = BigInt('40000000000');
const gasStationURL = (+process.env.WEB3_CHAIN_ID === 137) ? 'https://gasstation.polygon.technology/v2' : 'https://gasstation-testnet.polygon.technology/v2';
let maxFeePerGas = DEFAULT_GAS_FEES // fallback to 140 gwei
let maxPriorityFeePerGas = DEFAULT_GAS_PRIORITY_FEES // fallback to 40 gwei

// Call this function every time before a contract call
async function setOptimalGas() {
    try {
        console.log('Getting gas prices from gas station');
        const {data} = await axios({
            method: 'get',
            url: gasStationURL
        })
        maxFeePerGas = ethers.parseUnits(
            Math.ceil(data.fast.maxFee) + '',
            'gwei'
        )
        maxPriorityFeePerGas = ethers.parseUnits(
            Math.ceil(data.fast.maxPriorityFee) + '',
            'gwei'
        )
    } catch {
        console.error('Error getting gas prices from gas station');
        maxFeePerGas = DEFAULT_GAS_FEES;
        maxPriorityFeePerGas = DEFAULT_GAS_PRIORITY_FEES;
    }
}


/**
 * Send email.
 *
 * @param event {object} Event object.
 * @param to {string} Email address to send to.
 * @returns {Promise<any>}
 */
const mintNft = async (event, to) => {
    try {
        const provider = new ethers.InfuraProvider(+process.env.WEB3_CHAIN_ID, process.env.WEB3_API_KEY);
        const wallet = new ethers.Wallet(process.env.WALLET_SECRET, provider);
        const contract = new ethers.Contract(event.contract, abi, wallet);

        await setOptimalGas();
        console.log(`Send tx to wallet ${to}`);
        const tx = await contract.safeMint(event.tokenUri, to, {
            maxFeePerGas,
            maxPriorityFeePerGas
        });
        const receipt = await tx.wait();
        console.log(`Receipt tx to wallet ${to}`);
        return {receipt: receipt};
    } catch (e) {
        return {error: e?.reason ?? e.message ?? 'Unknown Error'}
    }
}

module.exports = {
    mintNft: mintNft
};