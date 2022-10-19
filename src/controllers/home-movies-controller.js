const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const HomeMovieModel = require('../models/home-movie-model');
const createHomeMovieViewModel = require('../view-models/create-home-movie-view-model');

const createHomeMovieNotFoundError = (homeMovieId) => createNotFoundError(`HomeMovie with id '${homeMovieId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const homeMoviesDocuments = await HomeMovieModel.find();

    res.status(200).json(homeMoviesDocuments.map(createHomeMovieViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const homeMovieId = req.params.id;

  try {
    const foundHomeMovieDoc = await HomeMovieModel.findById(homeMovieId);
    if (foundHomeMovieDoc === null) throw createHomeMovieNotFoundError(homeMovieId);

    res.status(200).json(createHomeMovieViewModel(foundHomeMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newHomeMovieData = req.body;

  try {
    await HomeMovieModel.validateData(newHomeMovieData);

    const newHomeMovieDoc = await HomeMovieModel.create(newHomeMovieData);

    res.status(201).json(createHomeMovieViewModel(newHomeMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const homeMovieId = req.params.id;
  const {
    title, description, categoryId, img, trailer,
  } = req.body;
  const newHomeMovieData = {
    title, description, categoryId, img, trailer,
  };

  try {
    await HomeMovieModel.validateData(newHomeMovieData);

    const updatedHomeMovieDoc = await HomeMovieModel.findByIdAndUpdate(
      homeMovieId,
      newHomeMovieData,
      { new: true, runValidators: true },
    );

    if (updatedHomeMovieDoc === null) throw createHomeMovieNotFoundError(homeMovieId);

    res.status(200).json(createHomeMovieViewModel(updatedHomeMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const homeMovieId = req.params.id;
  const requestData = req.body;

  try {
    await HomeMovieModel.validateUpdateData(requestData);
    const {
      title,
      description,
      img,
      trailer,
    } = requestData;

    const updatedHomeMovieDoc = await HomeMovieModel.findByIdAndUpdate(
      homeMovieId,
      {
        title,
        description,
        img,
        trailer,
      },
      { new: true },
    );

    if (updatedHomeMovieDoc === null) throw createHomeMovieNotFoundError(homeMovieId);

    res.status(200).json(createHomeMovieViewModel(updatedHomeMovieDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const homeMovieId = req.params.id;

  try {
    const deletedHomeMovieDoc = await HomeMovieModel.findByIdAndDelete(homeMovieId);
    if (deletedHomeMovieDoc === null) createHomeMovieNotFoundError(homeMovieId);

    res.status(200).json(createHomeMovieViewModel(deletedHomeMovieDoc));
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
