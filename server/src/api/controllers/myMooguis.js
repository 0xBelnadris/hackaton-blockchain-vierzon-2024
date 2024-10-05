const {Request, Response} = require('express');
const axios = require('axios');
const dbManager = require('../adapters/dbManager');

/**
 * User MooguisAPI.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const myMooguis = async (req, res) => {
    try {
        const user = await dbManager.findUser(req.user.email);

        if (user) {
            const response = await axios.get('https://api.simplehash.com/api/v0/nfts/owners',       {
                headers: {
                    'Accept': 'application/json',
                    'X-API-KEY': process.env.SIMPLE_HASH_SECRET
                },
                params: {
                    wallet_addresses: user.walletAddress,
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
            return res.status(401).json({message: 'Erreur d\'authentification.'});
        }
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = myMooguis;