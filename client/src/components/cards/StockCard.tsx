import * as React from "react";
// components
import LoadingSpinner from "../loading/LoadingSpinner";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// icons
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";

interface Product {
  product: string;
  company: string;
  category: string;
}

interface StockItem {
  id: string;
  product_id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Product: Product;
}

interface CategoryData {
  items: StockItem[];
  totalQuantity: number;
}

interface StocksData {
  [category: string]: CategoryData;
}

interface StockCardPorps {
  stocksData: StocksData;
  isLoading?: boolean;
}

export default function StockCard({
  stocksData = {},
  isLoading = false,
}: StockCardPorps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (isLoading) {
    return (
      <div className="w-full h-[32rem] flex justify-center items-center">
        <LoadingSpinner text="loading stocks data..." />
      </div>
    );
  }

  if (Object.keys(stocksData).length === 0) {
    return (
      <div className="w-full h-[32rem] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <MdRemoveShoppingCart className="text-red-400 text-6xl" />
          <p className="text-lightDark text-2xl">No stock found</p>
        </div>
      </div>
    );
  }

  /**
   * TSX
   */
  return (
    <div className="w-full">
      {Object.entries(stocksData).map(([category, value]) => (
        <Accordion
          elevation={0}
          sx={{ border: "1px solid lightgray" }}
          expanded={expanded === category}
          onChange={handleChange(category)}
        >
          <AccordionSummary
            sx={{ backgroundColor: "#E7F0DC" }}
            id={`${category}-header`}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${category}-content`}
          >
            <div className="w-full flex justify-between items-center mr-4">
              <div className="flex justify-center items-center gap-2">
                <p className="text-xl font-semibold text-lightDark">
                  {category}
                </p>{" "}
                <span className="text-slate-500 text-lg font-medium">
                  ( {value.totalQuantity} )
                </span>
              </div>
              <div>
                {value.totalQuantity > 0 ? (
                  <FaCheckCircle
                    style={{ color: "#28a745", fontSize: "24px" }}
                  />
                ) : (
                  <FaTimesCircle
                    style={{ color: "#dc3545", fontSize: "24px" }}
                  />
                )}
              </div>
            </div>
          </AccordionSummary>
          <div className="bg-gray-300 w-full h-[.05rem]"></div>
          <AccordionDetails>
            <div className="grid grid-cols-12 gap-3 mt-2">
              {value?.items?.map((item) => (
                <div className="col-span-6 flex justify-between items-center bg-[#E7F0DC] border-1 px-3 py-2 rounded-sm">
                  <div className="flex justify-center items-center gap-2">
                    <p
                      className={`${
                        item.quantity === 0 ? "text-red-400" : "text-lightDark"
                      } text-xl font-semibold`}
                    >
                      {item.Product.company}
                    </p>
                    <span className="text-gray-500 text-md">
                      ({item.Product.product})
                    </span>
                  </div>
                  -
                  <p className="text-gray-500 text-md font-semibold">
                    {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
