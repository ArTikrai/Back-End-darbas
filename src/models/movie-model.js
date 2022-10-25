const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const movieSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  bigImg: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  play: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const movieValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Movie.title must be a string')
    .required('Movie.title is required'),
  description: yup
    .string().typeError('Movie.description must be a string')
    .required('Movie.description is required'),
  categoryId: yup
    .string().typeError('Movie.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Movie.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid,
    )
    .required('Movie.categoryId is required'),
  img: yup
    .string().typeError('Movie.img must be a string')
    .required('Movie.img is required'),
  bigImg: yup
    .string().typeError('Movie.img must be a string')
    .required('Movie.img is required'),
  trailer: yup
    .string().typeError('Movie.img must be a string')
    .required('Movie.img is required'),
  play: yup
    .string().typeError('Movie.img must be a string')
    .required('Movie.img is required'),
  date: yup
    .number().typeError('Movie.price must be a number')
    .required('Movie.price is required')
    .positive('Movie.price must be positive'),
});

const movieUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Movie.title must be a string'),
  description: yup.string().typeError('Movie.description must be a string'),
  categoryId: yup.string().typeError('Movie.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Movie.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid,
    ),
  img: yup.string().typeError('Movie.img must be a string'),
  bigImg: yup
    .string().typeError('Movie.img must be a string'),
  trailer: yup
    .string().typeError('Movie.img must be a string'),
  play: yup
    .string().typeError('Movie.img must be a string'),
  date: yup.number()
    .typeError('Movie.price must be a number')
    .positive('Movie.price must be positive'),
});

movieSchema.statics.validateData = (movieData) => movieValidationSchema.validate(movieData);
// eslint-disable-next-line semi, max-len
movieSchema.statics.validateUpdateData = (movieData) => movieUpdateValidationSchema.validate(movieData)

const MovieModel = model('Movie', movieSchema);

module.exports = MovieModel;
