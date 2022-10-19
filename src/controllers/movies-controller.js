const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const MovieModel = require('../models/movie-model');
const createMoviePopulatedViewModel = require('../view-models/create-movie-populated-view-model');
const createMovieViewModel = require('../view-models/create-movie-view-model');

const createMovieNotFoundError = (movieId) => createNotFoundError(`Movie with id '${movieId}' was not found`);

const fetchAll = async (req, res) => {
  const {
    joinBy, id, categoryId,
  } = req.query;
  const joinedDocuments = joinBy === 'categoryId';
  const filter = {};

  // Query by many movie id's
  if (id) filter._id = id instanceof Array ? { $in: id } : id;
  if (categoryId) {
    filter.categoryId = categoryId instanceof Array
      ? { $in: categoryId }
      : categoryId;
  }

  try {
    const movieDocs = joinedDocuments
      ? await MovieModel.find(filter).populate('categoryId')
      : await MovieModel.find(filter);

    res.status(200).json(joinedDocuments
      ? movieDocs.map(createMoviePopulatedViewModel)
      : movieDocs.map(createMovieViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const movieId = req.params.id;
  const { joinBy } = req.query;
  const joinedDocument = joinBy === 'categoryId';

  try {
    const foundMovieDoc = joinedDocument
      ? await MovieModel.findById(movieId).populate('categoryId')
      : await MovieModel.findById(movieId);
    if (foundMovieDoc === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(joinedDocument
      ? createMoviePopulatedViewModel(foundMovieDoc)
      : createMovieViewModel(foundMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newMovieData = req.body;

  try {
    await MovieModel.validateData(newMovieData);

    const newMovieDoc = await MovieModel.create(newMovieData);

    res.status(201).json(createMovieViewModel(newMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const movieId = req.params.id;
  const {
    title, description, categoryId, images, price,
  } = req.body;
  const newMovieData = {
    title, description, categoryId, images, price,
  };

  try {
    await MovieModel.validateData(newMovieData);

    const updatedMovieDoc = await MovieModel.findByIdAndUpdate(
      movieId,
      newMovieData,
      { new: true, runValidators: true },
    );

    if (updatedMovieDoc === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(createMovieViewModel(updatedMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const movieId = req.params.id;
  const requestData = req.body;

  try {
    await MovieModel.validateUpdateData(requestData);
    const {
      title,
      description,
      categoryId,
      images,
      price,
    } = requestData;

    const updatedMovieDoc = await MovieModel.findByIdAndUpdate(
      movieId,
      {
        title,
        description,
        categoryId,
        images,
        price,
      },
      { new: true },
    );

    if (updatedMovieDoc === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(createMovieViewModel(updatedMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovieDoc = await MovieModel.findByIdAndDelete(movieId);
    if (deletedMovieDoc === null) createMovieNotFoundError(movieId);

    res.status(200).json(createMovieViewModel(deletedMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
