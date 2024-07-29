import { Op } from "sequelize";
import Product from "../models/product.model.js";
import Sequelize from "../database/connection.js";

export const ProductExistsByProdId = async (product_id) => {
  try {
    const product = await Product.findByPk(product_id);
    return product !== null;
  } catch (error) {
    throw new Error("Error checking product existence: " + error.message);
  }
};

export const ProductExistsByCategory = async ({
  company,
  category,
  product,
}) => {
  try {
    const existingProduct = await Product.findOne({
      attributes: ["product_id"],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("company")),
            company.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("category")),
            category.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("product")),
            product.toLowerCase()
          ),
        ],
      },
    });

    if (existingProduct) {
      const { product_id } = existingProduct.toJSON();
      return { isError: false, prod_id: product_id };
    }

    return { isError: false, prod_id: null };
  } catch (error) {
    return { isError: true, error: error.message || error };
  }
};

export const addProductDetails = async (req, res) => {
  try {
    const { company, category, product } = req.body;

    const result = await ProductExistsByCategory(req.body);

    if (result.isError) {
      return res.status(500).json(result.error);
    }

    if (result.prod_id) {
      return res.status(409).json("Already exists!");
    }

    // Create new product record
    const newProduct = await Product.create({
      company: company,
      category: category,
      product: product,
    });

    if (newProduct) {
      return res.status(200).json("Added new products!");
    }

    return res.status(400).json("Something went wrong!");
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};

export const getAllProductsDetails = async (req, res) => {
  try {
    // Fetch all product details and group by category
    const products = await Product.findAll({
      attributes: [
        "category",
        [Sequelize.fn("GROUP_CONCAT", Sequelize.col("product")), "products"],
        [Sequelize.fn("GROUP_CONCAT", Sequelize.col("company")), "companies"],
      ],
      group: ["category"],
      order: [["category", "ASC"]],
    });

    // Format the results
    const formattedProducts = products.map((product) => ({
      category: product.category,
      products: product.get("products").split(","),
      companies: product.get("companies").split(","),
    }));

    return res.status(200).json(formattedProducts);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
};
