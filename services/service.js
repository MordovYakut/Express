const {client} = require("../configs/config");

async function insertDocBD(){
    try {
        await client.connect();
        console.log('Database connection successful');
        const db = client.db("test");
        const users = db.collection("users");
        const user = {name: 'Pavel', text: 'Test'};
        const result = await users.insertOne(user);
        console.log(result);
    }catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

module.exports = {insertDocBD};