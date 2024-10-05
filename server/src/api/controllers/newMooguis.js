const {Request, Response} = require('express');
const { ethers } = require('ethers');
const abi = require('../../resources/Example.json');
const fs = require('fs');

/**
 * New Mooguis API.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const newMooguis = async (req, res) => {
    try {

        fs.readFile('./src/resources/comptes.txt', 'utf8', async (err, data) => {
            if (err) {
                return res.status(500).json({message: 'Erreur de lecture des comptes.'});
            }

            const users = data.split('\n');
            const user = users.find(u => u.startsWith(`${req.user.email}`));

            if (user) {
                // user = email###password###walletAddress###privateKey
                const values = user.split('###');
                const obj = {
                    email: values[0],
                    password: values[1],
                    walletAddress: values[2],
                    privateKey: values[3]
                };

                const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
                const wallet = new ethers.Wallet(process.env.WALLET_SECRET, provider);
                const contract = new ethers.Contract(process.env.NFT_CONTRACT_ADDRESS, abi, wallet);
                const tx = await contract.safeMint('ipfs://bafybeibulyuw4qmptj3z4kujjh2w5677xx3eizwydz2yao3nnrt7fhsnlq/1000.json', obj.walletAddress);

                // Attendre que la transaction soit confirmée
                const receipt = await tx.wait();

                res.status(200).send({message: 'New Mooguis minted', data : receipt});
            }
        });
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = newMooguis;