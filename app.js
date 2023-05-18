const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const restAPI = require("./router/rest");
const dbAPI = require("./controllers/controller");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static('public'));
app.use('/v1', restAPI);
app.use('/db', dbAPI);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function (err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ message: message });
})

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`)
})