const express = require('express');
const request = require('request');
const { HOST } = require('../utils/util');

const router = express.Router();

function buildRequestOptions(form) {
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
        form,
    };
}

function send(form, res) {
    const options = buildRequestOptions(form);

    // Make a request to the Spotify API for credentials and send the response back to the sender
    request(options, (error, response, body) => {
        res.send(error || JSON.parse(body));
    });
}

function getTokens(req, res) {
    /* eslint-disable camelcase */
    // The rule has been disabled so the parameters match the syntax of the Spotify API
    const { code, redirect_uri } = req.body;

    const form = {
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri || process.env.REDIRECT_URI,
    };
    /* eslint-enable camelcase */

    send(form, res);
}

function refreshToken(req, res) {
    /* eslint-disable camelcase */
    // The rule has been disabled so the parameters match the syntax of the Spotify API
    const { refresh_token } = req.body;

    const form = {
        grant_type: 'refresh_token',
        refresh_token,
    };
    /* eslint-enable camelcase */

    send(form, res);
}

/**
 * POST /api/token
 *
 * This endpoint changes its behaviour depending on the body parameter `grant_type`.
 * If `grant_type == 'authorization_code'`:
 *   Mandatory body parameters:
 *    - `grant_type`
 *    - `code`
 *      - The one from the previous interaction
 *   Optional body parameters:
 *    - `redirect_uri`
 *      - Must be the same as the one used in the previous interaction
 * If `grant_type == 'refresh_token'`:
 *   Mandatory body parameters:
 *    - `grant_type`
 *    - `refresh_token`
 */
router.post('/', (req, res) => {
    /* eslint-disable camelcase */
    const { grant_type } = res.body;

    let f;

    switch (grant_type) {
    case 'authorization_code':
        f = getTokens;
        break;
    case 'refresh_token':
        f = refreshToken;
        break;
    default:
        // 400 - Bad Request
        res.sendStatus(400);
        return;
    }
    /* eslint-enable camelcase */

    f(req, res);
});

module.exports = router;
