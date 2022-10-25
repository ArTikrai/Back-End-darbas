const createCategoryViewModel = require('./create-category-view-model');

const createMoviePopulatedViewModel = (moviePopulatedDoc) => ({
  id: moviePopulatedDoc._id.toString(),
  title: moviePopulatedDoc.title,
  description: moviePopulatedDoc.description,
  category: createCategoryViewModel(moviePopulatedDoc.categoryId),
  img: moviePopulatedDoc.img,
  bigImg: moviePopulatedDoc.bigImg,
  trailer: moviePopulatedDoc.trailer,
  play: moviePopulatedDoc.play,
  date: moviePopulatedDoc.date,
  createdAt: moviePopulatedDoc.createdAt,
  updatedAt: moviePopulatedDoc.updatedAt,
});

module.exports = createMoviePopulatedViewModel;
