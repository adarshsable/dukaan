import Stock from "../models/stock.model.js";
import Product from "../models/product.model.js";

export const updateStockQuantity = async (
  product_id,
  quantityChange,
  transaction
) => {
  try {
    const quantity_change_num = parseInt(quantityChange);

    // Find or create the stock entry
    let stock = await Stock.findOne({ where: { product_id } });
    if (!stock) {
      stock = await Stock.create({ product_id, quantity: 0 }, { transaction });
    }

    // Update stock quantity based on quantityChange
    if (quantity_change_num >= 0) {
      // Adding stock
      stock.quantity += quantity_change_num;
    } else {
      // Subtracting stock
      const quantity_to_subtract = Math.abs(quantity_change_num);
      if (stock.quantity < quantity_to_subtract) {
        throw new Error("Insufficient stock to subtract");
      }
      stock.quantity -= quantity_to_subtract;
    }

    // Save the updated stock
    await stock.save();
    return stock;
  } catch (error) {
    throw new Error("Error updating stock quantity: " + error.message);
  }
};

export const getAllStocksData = async (req, res) => {
  try {
    const allStocks = await Stock.findAll({
      include: [
        {
          model: Product,
          attributes: ["product", "company", "category"],
        },
      ],
    });

    if (allStocks?.length === 0) return res.status(200).json({});

    const categoryMapping = allStocks.reduce((acc, item) => {
      const { Product } = item;
      if (acc[Product.category]) {
        acc[Product.category].items.push(item);
        acc[Product.category].totalQuantity += item.quantity;
      } else {
        acc[Product.category] = {
          items: [item],
          totalQuantity: item.quantity,
        };
      }
      return acc;
    }, {});

    return res.status(200).json(categoryMapping);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};
