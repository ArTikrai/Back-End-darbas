const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030;

const apiRouter = require('./routers/api-router');
const authRouter = require('./routers/auth-router');

const server = express();

const {
  REACT_APP_SERVER_ADDRESS, DB_CONNECTION, TOKEN_SECRET,
} = process.env;
const constantsConfiguredInEnvFile = REACT_APP_SERVER_ADDRESS
  && DB_CONNECTION && TOKEN_SECRET;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in \'/.env\' file.');
  }

  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'));

  server.use('/api', apiRouter);
  server.use('/auth', authRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message;
    }

    console.log('connected to MongoDB Atlass');
    app.listen(PORT, (error) => {
      if (error) {
        console.error(error.message);
      }

      console.log(`server launched on ${PORT}`);
    });
  });
} catch (err) {
  console.error(err.message);
}
