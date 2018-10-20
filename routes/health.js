const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.status(200);
    res.send('Alive!');
});

module.exports = router;
