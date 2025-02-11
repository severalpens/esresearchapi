var express = require('express');
var router = express.Router();
const e = require('express');
const createStandardIndex = require('../../services/embed/createIndex');
const faqs = require('../../faqs.json');

router.post('/', async (req, res) => {
    const indexName = req.body.indexName;
    const sourceData = req.body.sourceData || faqs;
    const embeddingType = req.query.embeddingType;

    try {
        const results = await embed(indexName, embeddingType, sourceData);
        switch (embeddingType) {
            case sparse:
                createStandardIndex(indexName, sourceData);
                break;
            case dense:
                createStandardIndex(indexName, sourceData);
                break;

            default:
                createStandardIndex(indexName, sourceData);
                break;
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;
