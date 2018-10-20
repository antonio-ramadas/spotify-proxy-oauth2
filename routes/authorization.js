const express = require('express');
const { URL } = require('url');

const router = express.Router();

function sendAuthentication(res) {
    const url = new URL('https://slack.com/oauth/authorize');

    url.searchParams.append('client_id', process.env.CLIENT_ID);
    url.searchParams.append('scope', process.env.SCOPE);
    url.searchParams.append('team', process.env.TEAM);

    res.redirect(url.href);
}

/* GET users listing. */
router.get('/', (req, res) => {
    sendAuthentication(res);
});

module.exports = router;
