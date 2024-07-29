import express from "express";
const router = express.Router();
import {
  addPurchaseData,
  deletePartyPurchaseData,
  getPartyOrderPurchaseData,
  getPartyPurchaseData,
} from "../controller/purchase.controller.js";

// Add new purchase record data
router.post("/add", addPurchaseData);

// Get party-wise purchase data
router.get("/party-wise", getPartyPurchaseData);

// Get party-wise purchase data
router.post("/delete-purchase", deletePartyPurchaseData);

// Get party purchase order data
router.get("/party-order-details", getPartyOrderPurchaseData);

export default router;
