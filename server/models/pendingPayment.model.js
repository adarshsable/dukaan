import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
import Party from "./party.model.js";

const PendingPayment = sequelize.define("PendingPayment", {
  order_id: {
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
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paid_amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

// Define associations
Party.hasMany(PendingPayment, {
  foreignKey: "party_id",
  sourceKey: "party_id",
  onDelete: "CASCADE",
});

PendingPayment.belongsTo(Party, {
  foreignKey: "party_id",
  targetKey: "party_id",
  onDelete: "CASCADE",
});

export default PendingPayment;
