const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Database connection successful');
        const db = client.db("test");
        const users = db.collection("users");
        const count = await users.countDocuments();
        const result = await users.find().toArray();
        console.log(`В коллекции users ${count} документа/ов`);
        console.log(result);
    }catch(err) {
        console.log(err);
    } finally {
        await client.close();
        console.log()
    }
}

module.exports = {client, connectDB};
