import express from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller.js";

const productsRouters = express.Router();

productsRouters.get("/", getProducts);
productsRouters.get("/:id", getProductsById);
productsRouters.post("/", createProduct);
productsRouters.put("/:id", updateProductById);
productsRouters.delete("/:id", deleteProductById);

export default productsRouters;
