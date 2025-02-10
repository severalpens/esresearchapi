var express = require('express');
var router = express.Router();
const { searchFaqs } = require('../../services/elasticsearchService');

router.get('/', async (req, res) => {
    const search = req.query.search;
    try {
        const results = await searchFaqs(search);
        res.json(results);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
