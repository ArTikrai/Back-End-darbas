"use strict";

const RequestError = require('./request-error');

const createNotFoundError = (message) => new RequestError({ message, statusCode: 404 });


const sendErrorResponse = (err, res) => {
  let message;
  let status = 400;

  if (typeof err === 'string') {
    message = err;
  } else if (err instanceof RequestError) {
    message = err.message;
    status = err.statusCode;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = 'Request handler error';
  }

  res.status(status).json({ message });
}

module.exports = {
  createNotFoundError,
  sendErrorResponse,
  RequestError,
};