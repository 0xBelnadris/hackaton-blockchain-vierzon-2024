const jwt  = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    const token = authHeader.split(' ')[1];

    jwt .verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide.' });
        }

        req.user = user;
        console.log(req.user);
        next();
    });
}

module.exports = authenticateToken;