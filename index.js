const express = require('express');
const app = express();
const routes = require('./routes/routers');
const config = require('./config/confg');
const { MongoDbConnect } = require('./mongoDb/mongoDb');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');
const createMiddleware = require('swagger-express-middleware');

createMiddleware(swaggerDocs, app, (err, middleware) => {

    const port = config.application.port;

    const mongoDbConnect = new MongoDbConnect();

    mongoDbConnect.mongoDbConnect();


    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });

    app.use(middleware.metadata());

    app.use(middleware.parseRequest());

    app.use(bodyParser.json());

    app.use(`/${config.swagger.path}`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(`/${config.application.path}/${config.application.version}`, routes);

    // Error handler to display the validation error as HTML
    app.use((err, req, res, next) => {
        res.status(err.status);
        res.send({message: err.message});
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://${config.application.domain}:${port}`)
    });

});