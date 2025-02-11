var express = require('express');
var router = express.Router();
const { searchFaqs } = require('../services/elasticsearchService');

/* GET home page. */
router.get('/', async function(req, res) {
    try {
        const results = await searchFaqs();
        res.render('index', { faqs: results });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
