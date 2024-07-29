import SalesTable from "./components/SalesTable";

const Sales = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-lightDark py-4 px-6 rounded-md">
        <div className="text-white text-2xl">Sales Overview</div>
      </div>
      {/*=========== ALL SALES CARD ===========*/}
      <div className="mt-8">
        <SalesTable />
      </div>
    </div>
  );
};

export default Sales;
