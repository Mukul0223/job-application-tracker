const express = require('express');
const cors = require('cors');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');
const healthRouter = require('./routes/health.routes.js');
const asyncHandler = require('./utils/asyncHandler.js');
const ApiError = require('./utils/ApiError');
require('dotenv').config();

const app = express();

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1', healthRouter);

app.get(
  '/api/v1/test-error',
  asyncHandler(async () => {
    throw new ApiError(400, 'Test Error');
  })
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
