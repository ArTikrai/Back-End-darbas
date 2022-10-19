const createMovieViewModel = (movieDoc) => ({
  id: movieDoc._id.toString(),
  title: movieDoc.title,
  description: movieDoc.description,
  categoryId: movieDoc.categoryId.toString(),
  img: movieDoc.img,
  price: movieDoc.price,
  createdAt: movieDoc.createdAt,
  updatedAt: movieDoc.updatedAt,
});

module.exports = createMovieViewModel;
