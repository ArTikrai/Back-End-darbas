const { Router } = require('express');
const moviesRouter = require('./movies-router');
const categoriesRouter = require('./categories-router');
const usersRouter = require('./users-router');
const watchlistRouter = require('./watchlist-router');

const apiRouter = Router();

apiRouter.use('/movies', moviesRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/watchlist', watchlistRouter);

module.exports = apiRouter;
