import express from "express";
import {
  AddPartyPaymentDetails,
  DeletePartyPaymentDetails,
  GetPartyPaymentDetails,
} from "../controller/payment.controller.js";

const router = express.Router();

// Party payment details
router.get("/party-wise", GetPartyPaymentDetails);

router.post("/add", AddPartyPaymentDetails);

router.post("/delete", DeletePartyPaymentDetails);

export default router;
