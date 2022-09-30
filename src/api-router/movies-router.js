const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../controllers/movies-controller');

const moviesRouter = Router();

moviesRouter.get('/', fetchAll);
moviesRouter.get('/:id', fetch);
moviesRouter.post('/', create);
moviesRouter.put('/:id', replace);
moviesRouter.patch('/:id', update);
moviesRouter.delete('/:id', remove);

module.exports = moviesRouter;
