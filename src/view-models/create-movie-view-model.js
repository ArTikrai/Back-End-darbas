const createMovieViewModel = (movieDoc) => ({
  id: movieDoc._id.toString(),
  title: movieDoc.title,
  description: movieDoc.description,
  categoryId: movieDoc.categoryId.toString(),
  img: movieDoc.img,
  bigImg: movieDoc.bigImg,
  trailer: movieDoc.trailer,
  play: movieDoc.play,
  date: movieDoc.date,
  createdAt: movieDoc.createdAt,
  updatedAt: movieDoc.updatedAt,
});

module.exports = createMovieViewModel;
