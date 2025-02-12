var express = require('express');
var router = express.Router();

const { pipeline } = require('@xenova/transformers');

let embedder;
async function loadEmbedder() {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
}
loadEmbedder();

router.post('/', async (req, res) => {
    
    try {
        const text = req.body.text;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const embedding = await embedder(text, { pooling: 'mean', normalize: true });

        res.json({ embedding: embedding.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;
