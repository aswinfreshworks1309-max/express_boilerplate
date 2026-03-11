import Joi from "joi";

export const createInvoiceSchema = Joi.object({
  invoice_no: Joi.string().required(),
  cust_name: Joi.string(),
  cust_address: Joi.string(),
  amount: Joi.number(),
  tax: Joi.number(),
  city: Joi.string(),
  state: Joi.string(),
});

