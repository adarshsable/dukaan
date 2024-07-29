import express from "express";
//models
import { addParty, getAllParties } from "../controller/party.controller.js";

const router = express.Router();

// Add party name
router.post("/add-name", addParty);

// All parties name
router.get("/all", getAllParties);

export default router;
