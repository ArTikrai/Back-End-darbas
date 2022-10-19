const { Schema, model } = require('mongoose');
const yup = require('yup');

const homeMovieSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const homeMovieValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Movie.title must be a string')
    .required('Movie.title is required'),
  description: yup
    .string().typeError('Movie.description must be a string')
    .required('Movie.description is required'),
  img: yup
    .string().typeError('Movie.img must be a string')
    .required('Movie.img is required'),
  trailer: yup
    .string().typeError('Movie.trailer must be a string')
    .required('Movie.trailer is required'),
});

const homeMovieUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Movie.title must be a string'),
  description: yup.string().typeError('Movie.description must be a string'),
  img: yup.string().typeError('Movie.img must be a string'),
  trailer: yup.string().typeError('Movie.trailer must be a string'),
});

homeMovieSchema.statics.validateData = (movieData) => homeMovieValidationSchema.validate(movieData);
// eslint-disable-next-line semi, max-len
homeMovieSchema.statics.validateUpdateData = (movieData) => homeMovieUpdateValidationSchema.validate(movieData)

const HomeMovieModel = model('HomeMovie', homeMovieSchema);

module.exports = HomeMovieModel;
