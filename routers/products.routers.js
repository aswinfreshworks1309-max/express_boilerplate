import express from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller.js";
import { validateSchema } from "../middleware/validate.schema.js";
import { createProductSchema } from "../schemas/products.schema.js";

const productsRouters = express.Router();

productsRouters.get("/", getProducts);
productsRouters.get("/:id", getProductsById);

productsRouters.post("/", validateSchema(createProductSchema), createProduct);

productsRouters.put("/:id", updateProductById);
productsRouters.delete("/:id", deleteProductById);

export default productsRouters;
