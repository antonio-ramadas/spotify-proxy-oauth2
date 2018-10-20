const express = require('express');
const logger = require('morgan');

const healthRouter = require('./routes/health');
const authorizationRouter = require('./routes/authorization');
const oauthAccessRouter = require('./routes/oauthAccess');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', healthRouter);
app.use('/authorize', authorizationRouter);
app.use('/api/oauth.access', oauthAccessRouter);

module.exports = app;
