import Joi from "joi";

const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required().messages({
    "any.required": "Quantity is required.",
    "number.base": "Quantity must be a valid number.",
  }),
  inStock: Joi.boolean().required().messages({
    "any.required": "In-stock status is required.",
    "boolean.base": "In-stock status must be a boolean value.",
  }),
});

const variantsValidationSchema = Joi.object({
  type: Joi.string().required().messages({
    "any.required": "Variant type is required.",
    "string.base": "Variant type must be a valid string.",
  }),
  value: Joi.string().required().messages({
    "any.required": "Variant value is required.",
    "string.base": "Variant value must be a valid string.",
  }),
});

const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Product name is required.",
    "string.base": "Product name must be a valid string.",
  }),
  description: Joi.string().required().messages({
    "any.required": "Product description is required.",
    "string.base": "Product description must be a valid string.",
  }),
  price: Joi.number().required().messages({
    "any.required": "Product price is required.",
    "number.base": "Product price must be a valid number.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Product category is required.",
    "string.base": "Product category must be a valid string.",
  }),
  tags: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Each tag must be a valid string.",
      }),
    )
    .required()
    .messages({
      "any.required": "Product tags are required.",
      "array.base": "Product tags must be an array of strings.",
    }),
  variants: Joi.array().items(variantsValidationSchema).required().messages({
    "any.required": "Product variants are required.",
    "array.base": "Product variants must be an array of objects.",
  }),
  inventory: inventoryValidationSchema.required().messages({
    "any.required": "Product inventory is required.",
  }),
});

export default productValidationSchema;
