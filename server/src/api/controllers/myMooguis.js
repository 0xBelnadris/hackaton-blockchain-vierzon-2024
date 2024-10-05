const {Request, Response} = require('express');
const fs = require('fs');
const axios = require('axios');

/**
 * User MooguisAPI.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const myMooguis = async (req, res) => {
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

                const response = await axios.get('https://api.simplehash.com/api/v0/nfts/owners',       {
                    headers: {
                        'Accept': 'application/json',
                        'X-API-KEY': process.env.SIMPLE_HASH_SECRET
                    },
                    params: {
                        wallet_addresses: obj.walletAddress,
                        chains: 'avalanche-fuji',
                        contract_addresses: process.env.NFT_CONTRACT_ADDRESS
                    }
                });

                if(response.data?.nfts) {
                    return res.status(200).json({message: 'Récupération liste mooguis', data: response.data.nfts});
                } else {
                    return res.status(200).json({message: 'Récupération liste mooguis', data: []});
                }
            } else {
                return res.status(401).json({message: 'Email ou mot de passe incorrect.'});
            }
        });
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = myMooguis;