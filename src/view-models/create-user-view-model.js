const createWatchlistItemViewModel = require('./create-watchlist-view-model');

const createUserViewModel = (userDoc) => ({
  id: userDoc._id.toString(),
  email: userDoc.email,
  role: userDoc.role,
  watchlistMovie: userDoc.watchlist.map(createWatchlistItemViewModel),
  fullname: userDoc.fullname,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

module.exports = createUserViewModel;
