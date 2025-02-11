var express = require('express');
var router = express.Router();
const createStandardIndex = require('../../services/embed/createIndex');
const faqs = require('../../faqs.json');

router.post('/', async (req, res) => {
    console.log('req.body:', req.body);
    
    const indexName = req.body.indexName;
    const sourceData = req.body.sourceData || faqs;
    const embeddingType = req.query.embeddingType;
    let result = '';

    try {
        switch (embeddingType) {
            case 'sparse':
                result = await createStandardIndex(indexName, sourceData);
                break;
            case 'dense':
                result = await createStandardIndex(indexName, sourceData);
                break;

            default:
                result = await createStandardIndex(indexName, sourceData);
                break;
        }
        res.json(result);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = router;
