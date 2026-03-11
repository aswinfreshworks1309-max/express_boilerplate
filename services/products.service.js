import { ObjectId } from "mongodb";
import { client, MONGO_DATABASE } from "../index.js";

const getAllProducts = async () => {
  return await client
    .db(MONGO_DATABASE)
    .collection("products")
    .find({})
    .toArray();
};

const getProductById = async (id) => {
  try {
    const data = await client
      .db(MONGO_DATABASE)
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (data) return data;
    else return null;
  } catch (err) {
    throw new Error("error", err);
  }
};

const createProduct = async (productData) => {
  // this comes from request body
  try {
    const { product_name, price } = productData;
    const temp = await client
      .db(MONGO_DATABASE)
      .collection("products")
      .insertOne({
        product_name: product_name,
        price: price,
      });

    return temp;
  } catch (err) {
    throw new Error("error", err);
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const { price, rating, category, stock } = updatedData;

    const temp = await client
      .db(MONGO_DATABASE)
      .collection("products")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            price: price,
            rating: rating,
            category,
            stock,
          },
        },
      );

    if (temp.acknowledged == false) {
      // message -> success
      return false;
    }
    return true;
  } catch (err) {
    throw new Error("error", err);
  }
};

const deleteProduct = async (id) => {
  //todo
  const checkProductStatus = await getProductById(id);

  if (checkProductStatus !== null) {
    // perform deletion
    await client
      .db(MONGO_DATABASE)
      .collection("products")
      .deleteOne({
        _id: new ObjectId(id),
      });
    return true;
    
  } else {
    // return back
    return false;
  }
};

const productServices = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productServices;
