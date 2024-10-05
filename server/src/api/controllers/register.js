const {Request, Response} = require('express');
const jwt = require('jsonwebtoken');
const {ethers} = require('ethers');
const dbManager = require('../adapters/dbManager');

const secret = process.env.JWT_SECRET;

/**
 * User registration API.
 *
 * @param req {Request<ReguisterModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const wallet = ethers.Wallet.createRandom();

        await dbManager.createUser(email, password, wallet);

        const token = jwt.sign({email}, secret, {expiresIn: '8h'});
        return res.status(200).json({message: 'Compte créé avec succès', token});
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = register;