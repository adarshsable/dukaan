import express from "express";
import {
  addProductDetails,
  getAllProductsDetails,
} from "../controller/product.controller.js";

const router = express.Router();

// Add product details
router.post("/add-product-details", addProductDetails);

// All products details
router.get("/all-products-details", getAllProductsDetails);

export default router;
