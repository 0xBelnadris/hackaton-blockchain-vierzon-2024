const {Request, Response} = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

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

        fs.readFile('./src/resources/comptes.txt', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({message: 'Erreur de lecture des comptes.'});
            }

            const users = data.split('\n');
            const user = users.find(u => u.startsWith(`${email}###${password}`));

            if (user) {
                const token = jwt.sign({ email }, secret, { expiresIn: '8h' });
                return res.status(200).json({message: 'Connexion réussie', token});
            } else {
                return res.status(401).json({message: 'Email ou mot de passe incorrect.'});
            }
        });
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = login;