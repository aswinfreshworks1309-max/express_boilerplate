import Joi from "joi";

export const createProductSchema = Joi.object({
  product_name: Joi.string().required(),
  price: Joi.number().min(100).required(),
  // missing
  category: Joi.string().required(),
  stock: Joi.number().min(1).max(1000).required(),
  rating: Joi.number().min(1).max(5).required(),
});

/**
 * product_name - string
 * price - integer / number
 * category - string
 * stock - integer / number
 * ratings - integer/ number (1 to 5)
 *
 */
