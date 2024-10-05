require('dotenv').config();
const express = require('express');
const registerApi = require('./api');
const authenticateToken = require('./api/middleware/authenticateToken');
const path = require('path');

const app = express();
app.disable('x-powered-by');
app.use(express.json({limit: '1kb'}));
app.set('port', process.env.PORT || 8080);

const publicPath =  path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    // Servir une page HTML (par exemple, my-mooguis.html)
    res.sendFile(path.join(__dirname, 'public/login/index.html'));
});

app.get('/my-mooguis', authenticateToken, (req, res) => {
    // Servir une page HTML (par exemple, my-mooguis.html)
    res.sendFile(path.join(__dirname, 'public/my-mooguis/index.html'));
});

registerApi(app);

app.all('*', function(req, res) {
    res.redirect('/');
});

app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});