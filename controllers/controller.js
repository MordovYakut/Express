const express = require('express');
const controller = express.Router();
const { insertDocDB, findDocDB, findOneDocDB } = require('../services/service');

const urlencodedParser = express.urlencoded({extended: false});

controller.post('/comments', urlencodedParser, async (req, res) => {
    if (!req.body) return res.status(404);
    body = req.body;
    await insertDocDB(body);
    console.log(insertDocDB);
    res.send('Данные успешно добавлены!');
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