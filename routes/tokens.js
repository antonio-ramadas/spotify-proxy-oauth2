const express = require('express');
const request = require('request');
const { HOST } = require('../utils/util');

const router = express.Router();

function buildRequestOptions(res, code, redirectUri) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const credentialsEncoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    return {
        method: 'POST',
        url: `${HOST}/api/token`,
        headers: {
            Authorization: `Basic ${credentialsEncoded}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form:
            {
                code,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
            },
    };
}

function sendTokens(req, res) {
    /* eslint-disable camelcase, object-curly-newline */
    // The rule has been disabled so the parameters match the syntax of the Spotify API
    const { code, redirect_uri } = req.query;

    const options = buildRequestOptions(res, code, redirect_uri || process.env.REDIRECT_URI);
    /* eslint-enable camelcase, object-curly-newline */

    // Make a request to the Spotify API for credentials and send the response back to the sender
    request(options, (error, response, body) => {
        res.send(error || JSON.parse(body));
    });
}

/**
 * GET /api/token
 *
 * Mandatory parameters:
 *  - `code`
 *    - The one from the previous interaction
 *
 * Optional parameters:
 *  - `redirect_uri`
 *    - Must be the same as the one used in the previous interaction
 */
router.get('/', (req, res) => {
    sendTokens(req, res);
});

module.exports = router;
