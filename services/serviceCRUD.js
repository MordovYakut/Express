const ObjectId = require('mongodb').ObjectId;
const db = require("../configs/config");
const crypto = require('crypto');

async function checkApi(req, res, next){
    const collection = await db.collection('apikey');
    const apiKey = req.query.apiKey;
    const findApi = await collection.findOne({ _id: apiKey});
    if (findApi){
        next();
    }
    else {        
        res.status(401).send('Invalid API key');
    }
}

async function newDate(body){
    const collection = await db.collection('models');
    const currentDate = new Date();
    body.created_at = currentDate;
    body.updated_at = currentDate;
    await collection.insertOne(body);
}

async function insertMod(req,res){
    const collection = await db.collection('models');
    if (req.headers['content-type'] === 'application/json'){
        body = req.body;
        if (!body.name || !body.modelname || !body.type || !body.object || !body.overview || !body.comment || body === "" || Object.keys(body).length !== 6) {
            res.status(404).send('Error');
        }
        else{
            await newDate(body);
            const find =  await collection.find().toArray();
            res.send(find);
        }
    }
    else{
        res.status(404).send('Error');
    }
}

async function updateMod(req,res){
    const collection = await db.collection('models');
    if (req.headers['content-type'] === 'application/json'){
        body = req.body;
        if (!body.name || !body.modelname || !body.type || !body.object || !body.overview || !body.comment || body === "" || Object.keys(body).length !== 6) {
            res.status(404).send('Error');
        }
        else{
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: body.name,
                    modelname: body.modelname,
                    type: body.type,
                    object: body.object,
                    overview: body.overview,
                    comment: body.comment,
                    updated_at: new Date()
                }
            };
            const result = await collection.updateOne(filter, updateDoc);
            if (result.modifiedCount === 0) {
                res.status(404).send('Object not found');
            } else {
                const find =  await collection.find().toArray();
                res.send(find);
            }
        }
    }
    else{
        res.status(404).send('Error');
    }
}

async function deleteMod(req,res){
    const collection = await db.collection('models');
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const foundObject = await collection.findOne(filter);
    if (!foundObject){
        res.status(404).send('Object not found');
    }
    else{
        await collection.deleteOne(filter);
        res.send(`Object with id: "${id}" deleted successfully`);
    }
}

async function newApi(body){
    const collection = await db.collection('apikey');
    const newapikey = crypto.randomBytes(8).toString('hex');
    body._id = newapikey;
    await collection.insertOne(body);
    const findApi = await collection.findOne({ _id: newapikey});
    return findApi;
}

async function postApi(req,res){
    if (req.headers['content-type'] === 'application/json'){
        const body = req.body;
        if (!body.name || body.name === "" || Object.keys(body).length !== 1){ 
            res.status(404).send('Error');
        }
        else{
            const findApi = await newApi(body);
            res.send(findApi);
        }
    }
    else{
        res.status(404).send('Error');
    }
}

async function findMod(req,res){
    const collection = await db.collection('models');
    const findAll = await collection.find().toArray();
    if (findAll === 0){
        res.status(404).send('Error');
    }
    else{
        res.send(findAll);
    }
}

async function findOneMod(req,res){
    const collection = await db.collection('models');
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const foundObject = await collection.findOne(filter);
    if (!foundObject){
        res.status(404).send('Object not found');
    }
    else{
        res.send(foundObject);   
    }
}

module.exports = {
    postApi,
    checkApi,
    insertMod,
    updateMod,
    deleteMod,
    findMod,
    findOneMod
}