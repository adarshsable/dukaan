import express from "express";
import { GetPartyPendingPaymentDetails } from "../controller/pendingPayment.controller.js";

const router = express.Router();

// Party pending payment details
router.get("/party-wise", GetPartyPendingPaymentDetails);

export default router;
