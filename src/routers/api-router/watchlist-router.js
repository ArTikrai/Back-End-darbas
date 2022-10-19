const { Router } = require('express');
const {
  fetchAll,
  create,
  update,
  remove,
} = require('../../controllers/watchlist-controller');
const { requireUser } = require('../../middleware/auth-middleware');

const watchlistRouter = Router();
watchlistRouter.use(requireUser);

watchlistRouter.get('/', fetchAll);

watchlistRouter.post('/', create);

watchlistRouter.patch('/:id', update);

watchlistRouter.delete('/:id', remove);

module.exports = watchlistRouter;
