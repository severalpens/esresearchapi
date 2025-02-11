const { Client } = require('@elastic/elasticsearch');
const isLocalClient = false;
const node = isLocalClient ? process.env.ELASTICSEARCH_DOCKER_URL : process.env.ELASTICSEARCH_URL;
const apiKey = isLocalClient ? process.env.ELASTIC_DOCKER_API_KEY : process.env.ELASTIC_API_KEY;

const client = new Client({
    node: node,
    auth: {
        apiKey: apiKey
    }
});

async function searchFaqs(search) {
    let results = [];
    if (search) {
        const searchResult = await client.search({
            index: 'faqs',
            q: search
        });
        results = searchResult.hits.hits.map(hit => hit);
    } else {
        const allFaqs = await client.search({
            index: 'faqs',
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        results = allFaqs.hits.hits.map(hit => hit);
    }
    return results;
}

module.exports = {
    searchFaqs
};
