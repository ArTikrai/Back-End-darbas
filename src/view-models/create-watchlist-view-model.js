const createWatchlistWiewModel = (watchlistDoc) => ({
  cupId: watchlistDoc.movieId.toString(),
  amount: watchlistDoc.amount,
});

module.exports = createWatchlistWiewModel;
