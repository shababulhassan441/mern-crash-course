import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productsRoute from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow to use json data in body

app.use("/api/products", productsRoute);

// console.log(process.env.MONGODB_URI)

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port " + PORT);
});
