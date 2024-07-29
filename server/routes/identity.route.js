import express from "express";
const router = express.Router();
import {
  addIdentityData,
  getAllIdentitiesData,
} from "../controller/identity.controller.js";

// Add party name
router.post("/add-company-category", addIdentityData);

// All parties name
router.get("/all-categories-options", getAllIdentitiesData);

export default router;
