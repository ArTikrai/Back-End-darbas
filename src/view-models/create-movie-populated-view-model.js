const createCategoryViewModel = require('./create-category-view-model');

const createMoviePopulatedViewModel = (moviePopulatedDoc) => ({
  id: moviePopulatedDoc._id.toString(),
  title: moviePopulatedDoc.title,
  description: moviePopulatedDoc.description,
  category: createCategoryViewModel(moviePopulatedDoc.categoryId),
  images: moviePopulatedDoc.images,
  price: moviePopulatedDoc.price,
  createdAt: moviePopulatedDoc.createdAt,
  updatedAt: moviePopulatedDoc.updatedAt,
});

module.exports = createMoviePopulatedViewModel;
