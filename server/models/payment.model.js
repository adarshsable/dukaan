import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
import Party from "./party.model.js";
import PendingPayment from "./pendingPayment.model.js";

const Payment = sequelize.define("Payment", {
  payment_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => generateUUID(),
  },
  payment_date: {
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
  party_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Party,
      key: "party_id",
    },
  },
  payment: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_mode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Party.hasMany(Payment, {
  foreignKey: "party_id",
  sourceKey: "party_id",
  onDelete: "CASCADE",
});

Payment.belongsTo(Party, {
  foreignKey: "party_id",
  targetKey: "party_id",
  onDelete: "CASCADE",
});

PendingPayment.hasMany(Payment, { foreignKey: "order_id" });

Payment.belongsTo(PendingPayment, { foreignKey: "order_id" });

export default Payment;
