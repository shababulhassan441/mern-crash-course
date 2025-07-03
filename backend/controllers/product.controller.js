import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("failed to get Products ", error.message);
    res.status(500).json({ success: false, message: "server error " });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating Product".error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "product updated",
        data: updatedProduct,
      });
  } catch (error) {
    console.log("failed to updated Product ", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ success: false, message: "Invalid product id !"})
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
};
