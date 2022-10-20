const createWatchlistWiewModel = (watchlistDoc) => ({
  movieId: watchlistDoc.movieId.toString(),
  amount: watchlistDoc.amount,
});

module.exports = createWatchlistWiewModel;
