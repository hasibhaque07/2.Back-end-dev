const express = require('express');

const adminRouter = require('./adminRouter');

const publicRouter = express();

publicRouter.use(adminRouter);

module.exports = publicRouter;
