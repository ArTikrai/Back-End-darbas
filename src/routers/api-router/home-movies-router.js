const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/home-movies-controller');

const homeMoviesRouter = Router();

homeMoviesRouter.get('/', fetchAll);
homeMoviesRouter.get('/:id', fetch);
homeMoviesRouter.post('/', create);
homeMoviesRouter.put('/:id', replace);
homeMoviesRouter.patch('/:id', update);
homeMoviesRouter.delete('/:id', remove);

module.exports = homeMoviesRouter;
