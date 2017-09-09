'use strict';
require('./loadEnv');
const express = require('express');
const app = express();
const logger = require('./config/logger');
const routes = require('./app/route');

const Promise = require('bluebird');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static('./public'));

// start: set up db
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL, { useMongoClient: true, server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    logger.error(`unable to connect to database: ${process.env.MONGO_URL}`);
});

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log routes
app.use(function(req, res, next){
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});
app.use('/', routes);

app.listen(process.env.PORT, () => logger.info('server started'));
process.on('uncaughtException', function(err) {
    logger.error('error', err);
});
