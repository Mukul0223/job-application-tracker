const express = require('express');
const cors = require('cors');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');
require('dotenv').config();

const app = express();

let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
