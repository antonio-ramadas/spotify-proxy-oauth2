const express = require('express');
const logger = require('morgan');

const healthRouter = require('./routes/health');
const authorizationRouter = require('./routes/authorization');
const tokenRouter = require('./routes/token');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', healthRouter);
app.use('/authorize', authorizationRouter);
app.use('/api/token', tokenRouter);

module.exports = app;
