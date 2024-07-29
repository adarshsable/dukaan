import Payment from "../models/payment.model.js";
import sequelize from "../database/connection.js";
import {
  DeletePaidAmountDetails,
  UpdatePaidAmountDetails,
} from "./pendingPayment.controller.js";

export async function GetPartyPaymentDetails(req, res) {
  try {
    const { party_id } = req.query;

    if (!party_id) return res.status(400).json("Missing party_id parameter");

    // Fetch purchase data based on party_id
    const paymentData = await Payment.findAll({
      where: {
        party_id: party_id,
      },
      order: [
        ["payment_date", "DESC"],
        ["order_id", "ASC"],
      ],
    });

    if (!paymentData) return res.json(404).json("Party payments not found!");

    return res.status(200).json(paymentData);
  } catch (error) {}
}

export async function AddPartyPaymentDetails(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { party_id } = req.query;

    const requestedData = req.body;

    if (!party_id) return res.status(400).json("Missing party_id parameter");

    if (!requestedData.order_id)
      return res.status(400).json("Missing order_id parameter");

    // Step 1: Update party order paid amount
    const { data, isError } = await UpdatePaidAmountDetails(
      req.body,
      transaction
    );

    if (isError) throw new Error(data);

    // Step 2: Create a new payment entry
    const payment = await Payment.create(
      {
        party_id,
        order_id: requestedData.order_id,
        payment_date: requestedData.date,
        payment: parseInt(requestedData.payment),
        payment_mode: requestedData.payment_mode,
      },
      { transaction }
    );

    if (!payment) throw new Error("Something went wrong in creating payment!");

    // Step 3: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Payment created successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
}

export const DeletePartyPaymentDetails = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { order_id, payment_id, payment: amount } = req.body;

    if (!order_id) return res.status(409).json("Order Id field is required");
    if (!payment_id)
      return res.status(409).json("Payment Id field is required");
    if (!amount) return res.status(409).json("Payment field is required");

    // Step 1: Delete party order paid amount
    const { data, isError } = await DeletePaidAmountDetails(
      req.body,
      transaction
    );

    if (isError) throw new Error(data);

    // Step 2: Delete from payment table
    const paymentDelete = await Payment.destroy(
      { where: { payment_id: payment_id } },
      { transaction }
    );

    if (!paymentDelete) throw new Error("Payment not found!");

    // Step 3: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Payment record deleted successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};
