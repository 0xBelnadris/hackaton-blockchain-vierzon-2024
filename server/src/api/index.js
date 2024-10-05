const {rateLimit, MemoryStore} = require('express-rate-limit');
const authenticateToken = require('./middleware/authenticateToken');
const login = require('./controllers/login');
const register = require('./controllers/register');
const myMooguis = require('./controllers/myMooguis');
const newMooguis = require('./controllers/newMooguis');

const registerApi = (app) => {
    app.use('/api', rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        standardHeaders: true,
        store: new MemoryStore(),
    }));

    app.post('/api/login', login);
    app.post('/api/register', register);
    app.get('/api/my-mooguis', authenticateToken, myMooguis);
    app.post('/api/new-mooguis', authenticateToken, newMooguis);
}

module.exports = registerApi;