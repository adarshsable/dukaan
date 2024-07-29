import express from "express";
import {
  AddPartyReturnData,
  DeletePartyReturnData,
  GetPartyReturnDetails,
} from "../controller/return.controller.js";

const router = express.Router();

// Get return details
router.get("/party-wise", GetPartyReturnDetails);

// Add party return details
router.post("/add", AddPartyReturnData);

// Delete party return details
router.post("/delete", DeletePartyReturnData);

export default router;
