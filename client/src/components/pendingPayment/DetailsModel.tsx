import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import BasicModal from "../model/BasicModel";
import CommonTable from "../table/CommonTable";
// store
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";
// services
import { getPartyPurchaseOrderDetailsDataApi } from "@/services/Purchase";
// data
import { commonCols } from "@/data/CommonTable";
import { formattedPartyPurchaseTableColumns } from "./func";

const DetailsModel = () => {
  const { isDetailModelOpen, setIsDetailModelOpen, selectedData } =
    usePendingPaymentStore();

  /**
   * =========================== API CALL ===========================
   */

  // Query to fetch party purchase order details data
  const { data: orderDetailsData = [], isLoading } = useQuery({
    queryKey: ["purchase-order-details", selectedData],
    queryFn: () => getPartyPurchaseOrderDetailsDataApi(selectedData),
  });

  /**
   * =========================== EVENT-HANDLER ==========================
   */

  // formatted columns data
  const formattedCols = useMemo(() => {
    return formattedPartyPurchaseTableColumns(commonCols);
  }, [commonCols]);

  /**
   * TSX
   */
  return (
    <BasicModal
      modalWidth="80vw"
      modalHeight="30rem"
      title="Order Details"
      isOpen={isDetailModelOpen}
      onClose={setIsDetailModelOpen}
    >
      <CommonTable
        tableHeight="17.5rem"
        isLoading={isLoading}
        columns={formattedCols}
        rows={orderDetailsData || []}
      />
    </BasicModal>
  );
};

export default DetailsModel;
