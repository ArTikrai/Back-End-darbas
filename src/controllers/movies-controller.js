const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const MoviesModel = require('../models/movie-model');

const createMovieNotFoundError = (movieId) => createNotFoundError(`Movie with id '${movieId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const movieDocuments = joinBy === 'categoryId'
      ? await MoviesModel.find().populate('categoryId')
      : await MoviesModel.find();

    res.status(200).json(movieDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const movieId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundMovie = joinBy === 'categoryId'
      ? await MoviesModel.findById(movieId).populate('categoryId')
      : await MoviesModel.findById(movieId);

    if (foundMovie === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(foundMovie);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newMovieData = req.body;

  try {
    await MoviesModel.validateData(newMovieData);

    const newMovie = await MoviesModel.create(newMovieData);

    res.status(201).json(newMovie);
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const movieId = req.params.id;
  // eslint-disable-next-line object-curly-newline
  const { title, description, categoryId, img, price } = req.body;
  // eslint-disable-next-line object-curly-newline
  const newMovieData = { title, description, categoryId, img, price };

  try {
    await MoviesModel.validateData(newMovieData);

    const updatedMovie = await MoviesModel.findByIdAndUpdate(
      movieId,
      newMovieData,
      { new: true, runValidators: true },
    );

    if (updatedMovie === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(updatedMovie);
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const movieId = req.params.id;
  const {
    title, description, categoryId, img, price,
  } = req.body;
  const newMovieData = removeEmptyProps({
    title, description, categoryId, img, price,
  });

  try {
    await MoviesModel.validateUpdateData(newMovieData);

    const updatedMovie = await MoviesModel.findByIdAndUpdate(
      movieId,
      newMovieData,
      { new: true },
    );

    if (updatedMovie === null) throw createMovieNotFoundError(movieId);

    res.status(200).json(updatedMovie);
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await MoviesModel.findByIdAndDelete(movieId);
    if (deletedMovie === null) createMovieNotFoundError(movieId);

    res.status(200).json(deletedMovie);
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
