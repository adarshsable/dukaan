import Return from "../models/return.model.js";
import Product from "../models/product.model.js";
// controllers
import { ProductExistsByCategory } from "./product.controller.js";

export const GetPartyReturnDetails = async (req, res) => {
  try {
    const { party_id } = req.query;

    if (!party_id) {
      return res.status(400).json("Missing party_id parameter");
    }

    // Fetch purchase data based on party_id
    const returnData = await Return.findAll({
      where: {
        party_id: party_id,
      },
      order: [["return_date", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (returnData.length === 0) return res.status(200).json([]);

    const formattedReturnData = returnData.map((item) => {
      const {
        id,
        Product: { product, company, category },
        return_date: date,
        quantity,
        amount,
        product_id,
        order_id,
      } = item;
      return {
        id: id,
        date,
        order_id,
        product,
        company,
        category,
        quantity,
        price:amount,
        product_id,
      };
    });

    return res.status(200).json(formattedReturnData);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const AddPartyReturnData = async (req, res) => {
  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) throw new Error(result.error);

    if (!result.prod_id) throw new Error("Product id not found!");

    // Step 2: Add a new in return table
    const sale = await Return.create({
      product_id: result.prod_id,
      return_date: requestData.date,
      order_id: requestData.orderId,
      amount: parseInt(requestData.price),
      ...requestData,
    });

    if (!sale) throw new Error("Something went wrong in the return table!");

    return res.status(200).json("Return record added successfully!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const DeletePartyReturnData = async (req, res) => {
  try {
    const requestData = req.body;

    // Step 1: Delete from return table
    const saleDelete = await Return.destroy({ where: { id: requestData.id } });

    if (!saleDelete) throw new Error("Return product id not found!");

    return res.status(200).json("Return record deleted successfully!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
