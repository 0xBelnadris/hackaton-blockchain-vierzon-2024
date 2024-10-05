const {Request, Response} = require('express');
const jwt = require('jsonwebtoken');
const dbManager = require('../adapters/dbManager');

const secret = process.env.JWT_SECRET;

/**
 * User login API.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await dbManager.findUser(email);

        if (user && user.password === password) {
            const token = jwt.sign({ email }, secret, { expiresIn: '8h' });
            return res.status(200).json({message: 'Connexion réussie', token});
        } else {
            return res.status(401).json({message: 'Email ou mot de passe incorrect.'});
        }

    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = login;