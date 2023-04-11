const { request, response } = require('express');
const express = require('express');
const router = express.Router();

let user = {user_agent: 0};

const urlencodedParser = express.urlencoded({extended: false});

function checkAuthorization(req, res, next){
    const apiKey = req.query.apiKey;
    if (apiKey !== 'secret'){
        res.status(401).send('Что-то пошло не так.');
    }
    else {
        next();
    }
}

router.get('/', (req, res) => {
    res.send('Home');
})

router.post('/users', checkAuthorization, (req, res) => {
    res.send('Успешно!');
})

router.get('/stats', (req, res) => {
    user.user_agent++;
    res.send(`<table>
    <tr><th>User-agent:</th><th>Request:</th></tr>
    <tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
    </table>`);
})

router.post('/comments', urlencodedParser, (req, res) => {
    if (!req.body) return res.status(404);
    console.log(req.body);
    res.send('Данные успешно отправлены!');
})

module.exports = router;