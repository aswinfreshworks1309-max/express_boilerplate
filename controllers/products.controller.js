import productServices from "../services/products.service.js";
import { StatusCodes } from "http-status-codes";

/**
 *
 * @param {*} request
 * @param {*} response
 */

const getProducts = async (request, response) => {
  const data = await productServices.getAllProducts();
  if (data.length == 0)
    return response.status(StatusCodes.BAD_REQUEST).json(data);
  else return response.status(StatusCodes.OK).json(data);
};

const getProductsById = async (request, response) => {
  const { id } = request.params;
  try {
    const product = await productServices.getProductById(id);
    if (!product) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    response.status(StatusCodes.OK).json(product);
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const createProductController = async (request, response) => {
  const payload = request.body;
  console.log(payload);
  // products Service
  const insertStatus = await productServices.createProduct(payload);
  console.log(insertStatus);
  if (insertStatus.acknowledged === false) {
    // failed to create
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: "Failed to Create product",
    });
  } else {
    // status success
    return response.status(StatusCodes.OK).json({
      message: "product created successfully",
      id: insertStatus.insertedId,
    });
  }
};

const updateProductById = async (request, response) => {
  const data = request.body;
  // ?? option 1 -> const id = request.params.id;
  const { id } = request.params;

  const status = await productServices.updateProduct(id, data);

  if (status == false) {
    // 400 bad request
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: `Failed to update the id - ${id}`,
    });
  } else {
    // success
    return response.status(StatusCodes.OK).json({
      message: `Updated Successfully - ${id}`,
    });
  }
};

const deleteProductById = async (request, response) => {
  // todo
  const { id } = request.params;
  const status = await productServices.deleteProduct(id); // true or false

  if (status == false) {
    // id is wrong
    return response
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Invalid Id - ${id} is not found` });
  } else {
    
    // deletion completed
    return response
      .status(StatusCodes.OK)
      .json({ message: `Id - ${id} got deleted successfully` });
  }
};

export {
  getProducts,
  getProductsById,
  createProductController as createProduct,
  updateProductById,
  deleteProductById,
};
