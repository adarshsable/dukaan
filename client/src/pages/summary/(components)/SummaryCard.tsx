const data = [
  { label: "Total Profit", value: "1000" },
  { label: "Total Sales", value: "1000" },
  { label: "Total Purchase", value: "1000" },
  { label: "Total Expenses", value: "1000" },
];

const SummaryCard = () => {
  /**
   * TSX
   */
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {data.map(({ label, value }, idx) => (
        <div
          key={idx}
          className="bg-mediumDark col-span-3 py-4 px-6 rounded-md shadow-md border-lightDark border-[2px]"
        >
          <div className="text-white">{label}</div>
          <div className="text-white">Rs {value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
