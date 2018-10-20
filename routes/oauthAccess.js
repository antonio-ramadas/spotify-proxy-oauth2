const express = require('express');
const request = require('request');

const router = express.Router();

function sendAccessToken(res, code) {
    const options = {
        method: 'POST',
        url: 'https://slack.com/api/oauth.access',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form:
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
            },
    };

    request(options, (error, response, body) => {
        res.send(error || JSON.parse(body));
    });
}

/* GET users listing. */
router.get('/', (req, res) => {
    const { code } = req.query;

    sendAccessToken(res, code);
});

module.exports = router;
