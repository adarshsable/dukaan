import express from "express";
const router = express.Router();
import { getAllStocksData } from "../controller/stock.controller.js";

// Get all stocks data
router.get("/all-stocks", getAllStocksData);

export default router;
