const collection = require("../configs/config");

async function insertDocDB(body){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${day}:${month}:${year}`;
    body.date = formattedDate;
    await collection.insertOne(body);
}

async function findDocDB(){
    const findAll = await collection.find().toArray();
    return findAll;
}

async function findOneDocDB(usid){
    const findOne = await collection.findOne({name: usid});
    return findOne;
}

module.exports = {
    insertDocDB,
    findDocDB,
    findOneDocDB
};