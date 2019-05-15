const express = require('express');
const router = express.Router();

router.get('/graphql', (req, res) => {
    res.json({
        result: 'ok'
    });
});

module.exports = router;
