import dayjs from "dayjs";
import CopyCode from "@/components/common/CopyCode";

export const formattedPurchaseTableColumns = (commonCols: any) => {
  if (commonCols.length === 0) return [];

  const columns = [
    { header: "Order Id", accessorkey: "order_id" },
    ...commonCols,
    { header: "Avg Price", accessorkey: "avg_price" },
  ];

  return columns?.map(({ header, accessorkey }) => {
    return {
      header: header,
      id: accessorkey,
      accessorkey: accessorkey,
      size: accessorkey === "date" || accessorkey === "quantity" ? 40 : !20,
      accessorFn: (row: any) => row[accessorkey],
      Cell: ({ row }: { row: any }) => {
        const rowValue = row.original[accessorkey];

        if (accessorkey === "order_id") return <CopyCode code={rowValue} />;

        if (accessorkey === "price") return `Rs ${rowValue}`;

        if (accessorkey === "avg_price") return `Rs ${rowValue}`;

        if (accessorkey === "date")
          return dayjs(rowValue).format("DD-MMM-YYYY");

        return rowValue;
      },
    };
  });
};

export const formattedSalesTableColumns = (commonCols: any) => {
  if (commonCols.length === 0) return [];

  return commonCols?.map(
    ({ header, accessorkey }: { header: string; accessorkey: string }) => {
      return {
        header: header,
        id: accessorkey,
        accessorkey: accessorkey,
        accessorFn: (row: any) => row[accessorkey],
        Cell: ({ row }: { row: any }) => {
          const rowValue = row.original[accessorkey];

          if (accessorkey === "price") return `Rs ${rowValue}`;

          if (accessorkey === "date")
            return dayjs(rowValue).format("DD-MMM-YYYY");

          return rowValue;
        },
      };
    }
  );
};
