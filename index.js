import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import http from "http";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
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

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The Server is Running on the ${PORT}`);
});
