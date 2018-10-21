const express = require('express');
const { URL } = require('url');
const { HOST } = require('../utils/util');

const router = express.Router();

function buildURL(redirectUri, state, showDialog, scope) {
    const url = new URL(`${HOST}/authorize`);

    /* eslint-disable func-names */
    // A lambda would be nicer, but it would be lost the proper scope to use `this`
    url.addIfDefined = function (key, value) {
        if (value) {
            this.searchParams.append(key, value);
        }
    };
    /* eslint-enable func-names */

    // Mandatory parameters
    url.searchParams.append('client_id', process.env.CLIENT_ID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', redirectUri || process.env.REDIRECT_URI);

    // Optional parameters
    url.addIfDefined('state', state);
    url.addIfDefined('scope', scope || process.env.SCOPE);
    // Spotify defaults `show_dialog` to `false`
    url.addIfDefined('show_dialog', showDialog);

    return url;
}

function redirectToAuthorization(req, res) {
    /* eslint-disable camelcase, object-curly-newline */
    // The rule has been disabled so the parameters match the syntax of the Spotify API
    const { redirect_uri, state, scope, show_dialog } = req.query;

    const url = buildURL(redirect_uri, state, show_dialog, scope);
    /* eslint-enable camelcase, object-curly-newline */

    res.redirect(url.href);
}

/**
 * GET /authorize
 *
 * Optional query parameters:
 *  - `redirect_uri`
 *  - `state`
 *  - `scope`
 *    - _space-separated list_
 *  - `show_dialog`
 */
router.get('/', (req, res) => {
    redirectToAuthorization(req, res);
});

module.exports = router;
