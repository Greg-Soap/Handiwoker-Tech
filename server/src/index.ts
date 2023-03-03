import { config } from "dotenv";
config();
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import Products from "./models/Product";
import cors from "cors";
import CartModel from "./models/Cart";
const app: Application = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("db connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));

//CREATE SINGLE PRODUCT
app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const newProduct = new Products({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      quantity: req.body.quantity,
    });
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//DELETING SINGLE PRODUCT
app.delete("/api/products/:productId", async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await Products.findByIdAndDelete(productId);
    const newProducts = await Products.find();
    res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//DISPLAY PRODUCTS
app.get("/api/products", async (req: Request, res: Response) => {
  const products = await Products.find();
  res.status(200).json(products);
});

//DISPLAY SINGLE PRODUCT
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//CREATE CART ITEM
app.post("/api/cart/:productId", async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    let cart = await CartModel.findOne({ productId: productId });
    if (cart) {
      await CartModel.findOneAndUpdate(
        { _id: cart._id },
        { $inc: { quantity: 1 } }
      );
    } else {
      const newCart = new CartModel({
        productId: product._id,
        quantity: 1,
        product: product,
      });
      await newCart.save();
    }
    const newCarts = await CartModel.find().populate({
      path: "productId",
      model: "Products",
    });
    res.status(201).json(newCarts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//DELETE CART ITEM
app.delete("/api/cart/:productId", async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const cart = await CartModel.findOne({ productId: productId });
    if (cart) {
      await CartModel.findByIdAndDelete(cart._id);
    }
    const newCarts = await CartModel.find();
    res.status(200).json(newCarts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//GET ALL CART ITEMS
app.get("/api/cart", async (req: Request, res: Response) => {
  try {
    const carts = await CartModel.find().populate({
      path: "productId",
      model: "Products",
    });
    res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//GET SINGLE CART ITEM
app.get("/api/cart/:productId", async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Apologies Server Error");
  }
});
