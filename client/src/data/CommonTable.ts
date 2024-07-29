/**
 * ================= SALES & PURCHASE COLS ================
 */

// column for sales & purchase table data
export const commonCols = [
  { header: "Date", accessorkey: "date" },
  { header: "Product", accessorkey: "product" },
  { header: "Category", accessorkey: "category" },
  { header: "Company", accessorkey: "company" },
  { header: "Quanity", accessorkey: "quantity" },
  { header: "Weight", accessorkey: "weight" },
  { header: "Price", accessorkey: "price" },
];

/**
 * ================= RETURN COLS ================
 */

export const returnCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Date", accessorkey: "date" },
  { header: "Quanity", accessorkey: "qunatity" },
  { header: "Weight", accessorkey: "weight" },
  { header: "Price", accessorkey: "price" },
];

/**
 * ================= PENDING PAYMENT COLS ================
 */

export const pendingPaymentCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Date", accessorkey: "createdAt" },
  { header: "Total Amount", accessorkey: "total_amount" },
  { header: "Paid Amount", accessorkey: "paid_amount" },
];

/**
 * =================  PAYMENT COLS ================
 */

export const paymentCols = [
  { header: "Order Id", accessorkey: "order_id" },
  { header: "Date", accessorkey: "date" },
  { header: "payment", accessorkey: "payment" },
  { header: "Payment Mode", accessorkey: "payment_mode" },
];
