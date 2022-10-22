const UserModel = require('../models/user-model');
const createWatchlistViewModel = require('../view-models/create-watchlist-view-model');
const createToken = require('../helpers/token');

const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findMovie = (watchlist, id) => watchlist.find((item) => item.movieId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.watchlist.map(createWatchlistViewModel));
};

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateWatchlist(data);

    const foundMovie = findMovie(req.authUser.watchlistMovie, data.movieId);
    if (foundMovie) throw createBadDataError('Movie already exist in watchlist');

    const newWatchlistDoc = {
      movieId: data.movieId,
    };

    req.authUser.watchlistMovie.push(newWatchlistDoc);

    await req.authUser.save();

    res.status(200).json({
      watchlist: createWatchlistViewModel(newWatchlistDoc),
      token: createToken({ email: req.authUser.email, role: req.authUser.role }),
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const data = {
    movieId: req.params.id,
    amount: req.body.amount,
  };

  try {
    await UserModel.validateWatchlist(data);

    const foundWatchlistDoc = findMovie(req.authUser.watchlist, data.movieId);
    if (!foundWatchlistDoc) throw createNotFoundError('Movie does not exist in watchlist');

    foundWatchlistDoc.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(createWatchlistViewModel(foundWatchlistDoc));
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const movieId = req.params.id;

  try {
    const foundWatchlistDoc = findMovie(req.authUser.watchlist, movieId);
    if (!foundWatchlistDoc) throw createNotFoundError('Movie does not exist in watchlist');

    req.authUser.watchlist = req.authUser.watchlist.filter((x) => x.movieId.toString() !== movieId);

    await req.authUser.save();

    res.status(200).json(createWatchlistViewModel(foundWatchlistDoc));
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
