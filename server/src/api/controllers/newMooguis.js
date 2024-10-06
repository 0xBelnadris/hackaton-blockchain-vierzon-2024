const {Request, Response} = require('express');
const { ethers } = require('ethers');
const abi = require('../../resources/Example.json');
const dbManager = require('../adapters/dbManager');

/**
 * New Mooguis API.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const newMooguis = async (req, res) => {
    try {
        const user = await dbManager.findUser(req.user.email);

        if (user) {
            const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
            const wallet = new ethers.Wallet(process.env.WALLET_SECRET, provider);
            const contract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, abi, wallet);
            const tx = await contract.safeMint('ipfs://bafybeihpy6mthwq7zmyuvuliwelr37rolykwmrgzvllzisykg3qstw4koe', user.walletAddress);

            const receipt = await tx.wait();

            res.status(200).send({message: 'New Mooguis minted', data : receipt});
        } else {
            return res.status(401).json({message: 'Erreur d\'authentification.'});
        }
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = newMooguis;