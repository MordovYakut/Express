const express = require('express');
const controller = express.Router();
const { getcom, getcomid, postcom } = require('../services/service');
const { postApi, checkApi, insertMod, updateMod, deleteMod, findMod, findOneMod } = require('../services/serviceCRUD');

const jsonParser = express.json();

controller.post('/comments',jsonParser, postcom);

controller.get('/comments', getcom);

controller.get('/comments/:id', getcomid);

controller.get('/models/', findMod);

controller.get('/models/:id', findOneMod);

controller.post('/api', jsonParser, postApi);

controller.delete('/models/:id', checkApi, deleteMod);

controller.post('/models', checkApi, jsonParser, insertMod);

controller.put('/models/:id', checkApi, jsonParser, updateMod);

module.exports = controller;