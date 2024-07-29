import "dotenv/config";
import cors from "cors";
import express from "express";
// database connection
import database from "./database/connection.js";
// import Product from "./models/product.model.js";
// import Payment from "./models/payment.model.js";
// //import Purchase from "./models/purchase.model.js";
// import Party from "./models/party.model.js";
// import Expense from "./models/expense.model.js";
// import Stock from "./models/stock.model.js";
// import Sales from "./models/sales.model.js";
// import Return from "./models/return.model.js";
// import Identity from "./models/identity.model.js";
// import PendingPayment from "./models/pendingPayment.model.js";
// routes
import SaleRoute from "./routes/sale.route.js";
import StockRoute from "./routes/stock.route.js";
import PartyRoute from "./routes/party.route.js";
import ReturnRoute from "./routes/return.route.js";
import PaymentRoute from "./routes/payment.route.js";
import ProductRoute from "./routes/product.route.js";
import IdentityRoute from "./routes/identity.route.js";
import PurchaseRoute from "./routes/purchase.route.js";
import PendingPaymentRoute from "./routes/pendingPayment.route.js";

const PORT = 5001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

async function syncDatabase() {
  try {
    await database.sync();
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
}

syncDatabase();

app.use("/api/sales", SaleRoute);
app.use("/api/party", PartyRoute);
app.use("/api/stocks", StockRoute);
app.use("/api/return", ReturnRoute);
app.use("/api/product", ProductRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/identity", IdentityRoute);
app.use("/api/purchase", PurchaseRoute);
app.use("/api/pending-payment", PendingPaymentRoute);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
