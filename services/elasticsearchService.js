const createEsClient = require('./createEsClient');
const client = createEsClient();

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
