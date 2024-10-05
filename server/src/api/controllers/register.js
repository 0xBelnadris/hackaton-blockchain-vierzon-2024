const {Request, Response} = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {ethers} = require('ethers');

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

        const newUser = `${email}###${password}###${wallet.address}###${wallet.privateKey}\n`;

        // Ajouter le nouvel utilisateur dans comptes.txt
        fs.appendFile('./src/resources/comptes.txt', newUser, (err) => {
            if (err) {
                return res.status(500).json({message: 'Erreur de création de compte.'});
            }

            // Générer un token JWT
            const token = jwt.sign({email}, secret, {expiresIn: '8h'});
            return res.status(200).json({message: 'Compte créé avec succès', token});
        });
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = register;