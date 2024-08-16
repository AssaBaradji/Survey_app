const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'survey_app'; 

let db = null;
let client = null;

async function connectToDB() {
    if (db) return { db, client }; 
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('survey_app');
    return { db, client };
}

async function closeDB() {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}

module.exports = {
    connectToDB,
    closeDB,
};

