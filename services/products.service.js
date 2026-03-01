import { ObjectId } from "mongodb";
import { client, MONGO_DATABASE } from "../index.js";

/**
 *
 * @returns {products}
 */
const getAllProducts = async () => {
  return await client
    .db(MONGO_DATABASE)
    .collection("products")
    .find({})
    .toArray();
};

/**
 *
 * @param {*} id
 * @returns products
 */

const getProductById = async (id) => {
  const data = await client
    .db(MONGO_DATABASE)
    .collection("products")
    .findOne({ _id: new ObjectId(id) });
  if (data) return data;
  else return null;
};

/**
 *
 * @param {*} productData
 * @returns
 */
const createProduct = async (productData) => {
  return await client
    .db(MONGO_DATABASE)
    .collection("products")
    .insertOne(productData);
};

/**
 *
 * @param {*} id
 * @param {*} updatedData
 * @returns
 */
const updateProduct = async (id, updatedData) => {
  return await client
    .db(MONGO_DATABASE)
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
};

/**
 *
 * @param {*} id
 * @returns
 */
const deleteProduct = async (id) => {
  return await client
    .db(MONGO_DATABASE)
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
