// require('dotenv').config()
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8080;

// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({
//     node: process.env.ELASTICSEARCH_URL,
//     auth: {
//         apiKey: process.env.ELASTIC_API_KEY
//     }
// });



// app.use(cors()); // Enable CORS for all origins (you can restrict it later)
// app.use(express.json()); // Parse incoming JSON requests

// app.get('/', async (req, res) => {
//     const resp = await client.info();
//     res.send('Express API is running');
// });

// app.get('/faqs', async (req, res) => {
//     const search = req.query.search;
//     let query = {};
//     let results = [];
//     if (search) {
//         const searchResult = await client.search({
//             index: 'faqs',
//             q: search
//         });
        
//         results = searchResult.hits.hits.map(hit => {
//             return hit;
//         });
//     }else{
//         const allFaqs = await client.search({
//             index: 'faqs',
//             body: {
//                 query: {
//                     match_all: {}
//                 }
//             }
//         });
//         results = allFaqs.hits.hits.map(hit => {
//             return hit;
//         });
//     }

//     res.json(results);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
