import Joi from 'joi';

// Define the Joi validation schema for Product
const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required',
    'string.empty': 'Description cannot be empty',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Category is required',
    'string.empty': 'Category cannot be empty',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Tags are required',
    'array.base': 'Tags must be an array of strings',
  }),
  variants: Joi.array().items(Joi.object()).required().messages({
    'any.required': 'Variants are required',
    'array.base': 'Variants must be an array of objects',
  }),
  inventory: Joi.object().required().messages({
    'any.required': 'Inventory is required',
    'object.base': 'Inventory must be an object',
  }),
});

export default productValidationSchema;
