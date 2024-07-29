import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
import Product from "./product.model.js";

const Sales = sequelize.define("Sales", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: "product_id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
Product.hasMany(Sales, { foreignKey: "product_id" });
Sales.belongsTo(Product, { foreignKey: "product_id" });

export default Sales;
