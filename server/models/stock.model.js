import { DataTypes } from "sequelize";
import Product from "./product.model.js";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: Product,
      key: "product_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
Product.hasOne(Stock, { foreignKey: "product_id" });
Stock.belongsTo(Product, { foreignKey: "product_id" });

export default Stock;
