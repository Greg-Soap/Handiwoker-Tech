import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  desc: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
});

const ProductModel = mongoose.model("Products", ProductSchema);

export default ProductModel;
