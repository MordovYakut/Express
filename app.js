const express = require("express");

const restAPI = require("./js/rest")

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.static('public'));
app.use(restAPI);

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
})