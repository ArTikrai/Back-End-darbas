const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const categoryValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Category.title must be a string')
    .required('Category.title is required'),
});

const categoryUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Category.title must be a string'),
});

// eslint-disable-next-line max-len
categorySchema.statics.validateData = (categoryData) => categoryValidationSchema.validate(categoryData);
// eslint-disable-next-line semi, max-len
categorySchema.statics.validateUpdateData = (categoryData) => categoryUpdateValidationSchema.validate(categoryData);

const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;
