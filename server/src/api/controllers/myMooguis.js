const {Request, Response} = require('express');

/**
 * User MooguisAPI.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const myMooguis = async (req, res) => {
    try {
        // Fetch Mooguis NFT on chain. Use a API like SimpleHash to get the NFTs.
        // (can fetch NFTs on a specific Smart Contract Address & Wallet)
        return res.status(200).json({message: 'Récupération liste mooguis', data: []});
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = myMooguis;