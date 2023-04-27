const { insertDocDB, findDocDB, findOneDocDB } = require('./service');

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