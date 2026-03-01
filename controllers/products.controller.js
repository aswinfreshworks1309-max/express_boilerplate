import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/products.service.js";

const getProducts = async (request, response) => {
  try {
    const products = await getAllProducts();
    response.status(200).json(products);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getProductsById = async (request, response) => {
  const { id } = request.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json(product);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

const createProductController = async (request, response) => {
  const { product_name, price, ...rest } = request.body;

  // Type Enforcement
  if (typeof product_name !== "string" || typeof price !== "number") {
    return response.status(400).json({
      message:
        "Invalid data types: product_name (string) and price (number) are required.",
    });
  }

  const productData = {
    product_name,
    price,
    ...rest,
  };

  try {
    const result = await createProduct(productData);
    response
      .status(201)
      .json({ message: "Product created successfully", result });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

const updateProductById = async (request, response) => {
  const { id } = request.params;
  const { product_name, price } = request.body;

  // Validation
  if (product_name !== undefined && typeof product_name !== "string") {
    return response
      .status(400)
      .json({ message: "product_name must be a string" });
  }
  if (price !== undefined && typeof price !== "number") {
    return response.status(400).json({ message: "price must be a number" });
  }

  const updatedData = { ...request.body };

  try {
    const result = await updateProduct(id, updatedData);
    if (result.matchedCount === 0) {
      return response.status(404).json({ message: "Product not found" });
    }
    response
      .status(200)
      .json({ message: "Product updated successfully", result });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

const deleteProductById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await deleteProduct(id);
    if (result.deletedCount === 0) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

export {
  getProducts,
  getProductsById,
  createProductController as createProduct,
  updateProductById,
  deleteProductById,
};
