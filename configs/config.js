const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true });

client.connect();
console.log('Database connection successful');
const db = client.db("test");
const collection = db.collection("users");

module.exports = collection;