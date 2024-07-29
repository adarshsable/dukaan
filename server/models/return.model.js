import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
// models
import Product from "./product.model.js";
import Party from "../models/party.model.js";
import Purchase from "../models/purchase.model.js";
import PendingPayment from "./pendingPayment.model.js";

const Return = sequelize.define("Return", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  party_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Party,
      key: "party_id",
    },
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: PendingPayment,
      key: "order_id",
    },
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: "product_id",
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

PendingPayment.hasMany(Return, { foreignKey: "order_id" });

Return.belongsTo(PendingPayment, { foreignKey: "order_id" });

Party.hasMany(Return, { foreignKey: "party_id" });

Return.belongsTo(Party, { foreignKey: "party_id" });

Product.hasMany(Return, { foreignKey: "product_id" });

Return.belongsTo(Product, { foreignKey: "product_id" });

export default Return;
