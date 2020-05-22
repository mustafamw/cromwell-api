const config = require('../config/confg');
const { MongoClient } = require('mongodb');

let mongoDb = {
    db: undefined
};

class MongoDbConnect {
    
    constructor() {
    }

    async mongoDbConnect() {
        try {
            await MongoClient.connect(config.mongodb.url, { 
                useUnifiedTopology: true 
            }, (err, db) => {
                if (err) throw err;
                mongoDb.db = db;
            });
        } catch (e) {
            console.error(e);
        }
    }
    
}

module.exports = { MongoDbConnect, mongoDb }