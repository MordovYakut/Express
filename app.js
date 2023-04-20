const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const restAPI = require("./router/rest");
const {connectDB} = require("./configs/config");
const {insertDocBD} = require("./services/service");

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static('public'));
app.use('/v1', restAPI);

app.listen(port, hostname, () => {
    connectDB();
    console.log(`Server is running on http://${hostname}:${port}`)
})

app.use((req, res) => {
    res.status(404).send('Данная страница не найдена!');
})

app.use((err, req,res) => {
    res.status(500).send('Ошибка сервера')
})