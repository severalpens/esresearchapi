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
    const indexExists = await client.indices.exists({ index: indexName });
    if (indexExists) {
        console.log(`Index ${indexName} already exists`);
        console.log(`Deleting index: ${indexName} `);
        await client.indices.delete({ index: indexName });
   }

    const newIndex = await client.indices.create({
        index: indexName,
        body: {
            mappings: {
                properties: {
                    Question: { type: 'text' },
                    Answer: { type: 'text' }
                }
            }
        }
    });
    console.log(`newIndex`, newIndex);
    const bulkData = sourceData.flatMap(doc => [{ index: { _index: indexName } }, doc]);
    const result = await client.bulk({ refresh: true, body: bulkData });
    if (result.errors) {
        console.error('Failed to index data:', result.errors);
    } else {
        console.log(`Successfully indexed ${sourceData.length} documents`);
    }
    return ['success'];

}

module.exports = createStandardIndex;