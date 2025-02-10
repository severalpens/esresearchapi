var express = require('express');
var router = express.Router();


router.get('/', async (req, res) => {
res.render('api', { title: 'API' });
});

module.exports = router;
