const createMovieViewModel = (movieDoc) => ({
  id: movieDoc._id.toString(),
  title: movieDoc.title,
  description: movieDoc.description,
  categoryId: movieDoc.categoryId.toString(),
  images: movieDoc.images,
  price: movieDoc.price,
  createdAt: movieDoc.createdAt,
  updatedAt: movieDoc.updatedAt,
});

module.exports = createMovieViewModel;
