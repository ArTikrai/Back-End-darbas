const createWatchlistWiewModel = (watchlistDoc) => ({
  movieId: watchlistDoc.movieId.toString(),
});

module.exports = createWatchlistWiewModel;
