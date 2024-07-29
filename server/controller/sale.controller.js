import sequelize from "../database/connection.js";
// models
import Sales from "../models/sales.model.js";
import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";
import { ProductExistsByCategory } from "./product.controller.js";

export const GetProductSaleDetails = async (req, res) => {
  try {
    // Fetch purchase data based on party_id
    const sales = await Sales.findAll({
      order: [["date", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (sales.length === 0) return res.status(200).json([]);

    const formattedSalesData = sales.map((item) => {
      const {
        id,
        Product: { product, company, category },
        date,
        quantity,
        weight,
        price,
        product_id,
      } = item;
      return {
        id: id,
        date: date,
        product,
        company,
        category,
        quantity,
        weight,
        price,
        product_id,
      };
    });

    return res.status(200).json(formattedSalesData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const AddProductSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Check if product exists
    const result = await ProductExistsByCategory(req.body);

    if (result.isError) throw new Error(result.error);

    if (!result.prod_id) throw new Error("Product id not found!");

    // Step 2: Add a new in sale table
    const sale = await Sales.create(
      {
        product_id: result.prod_id,
        ...requestData,
      },
      { transaction }
    );

    if (!sale) throw new Error("Something went wrong in the sale table!");

    // Step 4: Update or insert in stock table
    const stock = await Stock.findOne({
      where: { product_id: result.prod_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock!");

    const { quantity } = req.body;
    const quantity_in_num = parseInt(quantity);
    const currentQuantity = parseInt(stock.quantity) || 0;

    if (quantity_in_num === 0)
      throw new Error("Quantity must be greater than zero");

    if (currentQuantity < quantity_in_num)
      throw new Error("Product quantity is out of range");

    // Update existing stock
    const stockUpdated = await stock.update(
      { quantity: currentQuantity - quantity_in_num },
      { transaction }
    );

    if (!stockUpdated) throw new Error("Error while updating stock!");

    // Step 5: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Sale record added successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};

export const DeleteProductSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const requestData = req.body;

    // Step 1: Delete from sales table
    const saleDelete = await Sales.destroy(
      { where: { id: requestData.id } },
      { transaction }
    );

    if (!saleDelete) throw new Error("Sale product not found!");

    // Step 2: Delete sale product quantity from stock table
    const stock = await Stock.findOne({
      where: { product_id: requestData.product_id },
      transaction,
    });

    if (!stock) throw new Error("Product not found in stock table");

    const { quantity } = requestData;
    const quantity_in_num = parseInt(quantity);

    const currentQuantity = parseInt(stock.quantity) || 0;

    // Update existing stock
    const stockUpdated = await stock.update(
      { quantity: currentQuantity + quantity_in_num },
      { transaction }
    );
    if (!stockUpdated)
      throw new Error("Something went wrong while updation stock!");

    // Step 3: Commit the transaction
    await transaction.commit();
    return res.status(200).json("Sale product record deleted successfully!");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(error.message || error);
  }
};
