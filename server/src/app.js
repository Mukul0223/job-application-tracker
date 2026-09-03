const express = require('express');
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');
const healthRouter = require('./routes/health.routes.js');
const userRouter = require('./routes/user.routes.js');
const applicationRouter = require('./routes/application.routes.js');
const interviewRouter = require('./routes/interview.routes.js');
require('dotenv').config();

const app = express();

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/v1', healthRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/applications', applicationRouter);
app.use('/api/v1/interviews', interviewRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
