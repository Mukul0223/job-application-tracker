const express = require('express');
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');
const healthRouter = require('./routes/health.routes.js');
const userRouter = require('./routes/user.routes.js');
const asyncHandler = require('./utils/asyncHandler.js');
const ApiError = require('./utils/ApiError');
const requireAuth = require('./middleware/requireAuth.middleware.js');
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

app.get(
  '/api/v1/test-error',
  asyncHandler(async () => {
    throw new ApiError(400, 'Test Error');
  })
);

app.get(
  '/api/v1/test-auth',
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ userId: req.auth.userId });
  })
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
