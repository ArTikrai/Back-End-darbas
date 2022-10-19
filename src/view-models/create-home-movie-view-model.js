const createHomeMovieViewModel = (homeMovieDoc) => ({
  id: homeMovieDoc._id.toString(),
  title: homeMovieDoc.title,
  description: homeMovieDoc.description,
  img: homeMovieDoc.img,
  trailer: homeMovieDoc.trailer,
  createdAt: homeMovieDoc.createdAt,
  updatedAt: homeMovieDoc.updatedAt,
});

module.exports = createHomeMovieViewModel;
