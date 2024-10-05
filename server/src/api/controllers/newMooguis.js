const {Request, Response} = require('express');
const fs = require('fs');
const axios = require('axios');

/**
 * New Mooguis API.
 *
 * @param req {Request<LoginModel>}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const newMooguis = async (req, res) => {
    try {
        console.log(req);
        res.status(200).send(JSON.stringify({message: 'New Mooguis minted'}));
    } catch (e) {
        res.status(400).send(JSON.stringify(e));
    }
}

module.exports = newMooguis;