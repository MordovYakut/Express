const ObjectId = require('mongodb').ObjectId;
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
    const findOne = await collection.findOne({ _id: new ObjectId(usid)});
    return findOne;
}

async function postcom(req,res){
    if (req.headers['content-type'] === 'application/json'){
        body = req.body;
        if (!body.name || !body.text || body == "") {
            res.status(404).send('Error');
        }
        else{
            await insertDocDB(body);
            const find = await findDocDB();
            res.send(find);
        }
    }
    else{
        res.status(404).send('Error');
    }
}

async function getcom(req,res){
    const find = await findDocDB();
    res.send(find);
}

async function getcomid(req, res){
    let usid = req.params.id;
    const result = await findOneDocDB(usid);
        if(result === null){
            res.status(404);
            res.send('Error!');
        }
        else{
            res.send(result);
        }
}

module.exports = {
    getcom,
    getcomid,
    postcom
}