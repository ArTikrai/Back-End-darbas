const { Router } = require('express');
const moviesRouter = require('./movies-router');
const categoriesRouter = require('./categories-router');

const apiRouter = Router();

apiRouter.use('/movies', moviesRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
