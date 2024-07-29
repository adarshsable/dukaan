import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import generateUUID from "../utils/uuidGenerator.js";
// models
import Party from "./party.model.js";
import Product from "./product.model.js";
import PendingPayment from "./pendingPayment.model.js";

const Purchase = sequelize.define("Purchase", {
  purchase_id: {
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
  purchase_date: {
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
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: PendingPayment,
      key: "order_id",
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

// Define association
Party.hasMany(Purchase, {
  foreignKey: "party_id",
  sourceKey: "party_id",
  onDelete: "CASCADE",
});

Purchase.belongsTo(Party, {
  foreignKey: "party_id",
  targetKey: "party_id",
  onDelete: "CASCADE",
});

Product.hasMany(Purchase, { foreignKey: "product_id" });

Purchase.belongsTo(Product, { foreignKey: "product_id" });

// Purchase.hasMany(PendingPayment, { foreignKey: "order_id" });

// PendingPayment.belongsTo(Purchase, { foreignKey: "order_id" });

Purchase.hasMany(PendingPayment, {
  foreignKey: "order_id",
  sourceKey: "order_id",
  onDelete: "CASCADE",
});

PendingPayment.belongsTo(Purchase, {
  foreignKey: "order_id",
  targetKey: "order_id",
  onDelete: "CASCADE",
});


export default Purchase;
