const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'СРА4 СРА4 СРА4 СРА4 СРА4 СРА4 ' });
});

module.exports = router;
