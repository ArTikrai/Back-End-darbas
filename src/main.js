/* eslint-disable object-curly-newline */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./api-router');

const server = express();

// eslint-disable-next-line no-undef
const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION } = process.env;
// eslint-disable-next-line max-len
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in \'/.env\' file');
  }

  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'));

  server.use('/api', apiRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message;
    }

    console.log('Connected to MongoDB Atlass');
    // eslint-disable-next-line no-shadow
    server.listen(SERVER_PORT, (err) => {
      if (err) {
        console.error(err.message);
      }

      console.log(`Server launched on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
    });
  });
} catch (err) {
  console.error(err.message);
}
