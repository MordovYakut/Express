const express = require('express');
const controller = express.Router();
const { getcom, getcomid, postcom } = require('../services/contserv');

// const jsonParser = express.json();

controller.post('/comments', postcom);

controller.get('/comments', getcom)

controller.get('/comments/:id', getcomid)

module.exports = controller;