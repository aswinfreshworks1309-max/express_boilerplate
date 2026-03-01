import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 4000;
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();

// installing middleware
app.use(express.json());
app.use(cors());

export const MONGO_DATABASE = process.env.MONGO_DATABASE;

import productsRouters from "./routers/products.routers.js";
app.use("/products", productsRouters);

app.get("/", (request, response) => {
  return response.send({
    message: "welcome to express js server",
  });
});

app.listen(PORT, () => {
  console.log(`The server is running on the port - ${PORT} 😊`);
});
