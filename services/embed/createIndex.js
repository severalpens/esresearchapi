const fs = require('fs');
const path = require('path');

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

async function createStandardIndex(indexName,sourceData) {

    await client.indices.delete({ index: indexName });

    await client.indices.create({
        index: indexName,
        body: {
            mappings: {
                properties: {
                    question: { type: 'text' },
                    answer: { type: 'text' }
                }
            }
        }
    });

    const bulkBody = sourceData.flatMap(doc => [{ index: { _index: indexName } }, doc]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body: bulkBody });

    if (bulkResponse.errors) {
        console.error('Bulk insert errors:', bulkResponse.errors);
    } else {
        console.log('FAQs index created and data inserted successfully');
    }
}

module.exports = createStandardIndex;