const express = require('express');
const controller = express.Router();
const { insertDocDB, findDocDB, findOneDocDB } = require('../services/service');

const jsonParser = express.json();

controller.post('/comments', jsonParser, async (req, res) => {
    if (req.headers['content-type'] === 'application/json'){
        body = req.body;
        if (!body.name || !body.text || body == "") {
            res.status(404).send('Error');
        }
        else{
            await insertDocDB(body);
            res.send('Данные успешно добавлены!');
        }
    }
    else{
        res.status(404).send('Error');
    }
})

controller.get('/comments', async (req,res) => {
    const find = await findDocDB();
    res.send(find);
})

controller.get('/comments/:id', async (req,res) => {
    let usid = req.params.id;
    const result = await findOneDocDB(usid);
        if(result === null){
            res.status(404);
            res.send('Error!');
        }
        else{
            res.send(result);
        }
})

module.exports = controller;