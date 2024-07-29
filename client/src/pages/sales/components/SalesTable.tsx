import { useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import SalesModel from "./SalesModel";
import CommonTable from "@/components/table/CommonTable";
import ConfirmationModel from "@/components/model/ConfirmationModel";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { useConfirmationStore } from "@/store/confirmationModelStore";
// services
import { deleteSalesDataApi, getSalesDataApi } from "@/services/Sales";
// data
import { commonCols } from "@/data/CommonTable";
import { formattedSalesTableColumns } from "@/pages/party/data/func";

const SalesTable = () => {
  const queryClient = useQueryClient();
  const { setIsModelOpen } = usePurchaseStore();

  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedData } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch sales data
  const { data: salesRowsData = [], isLoading } = useQuery({
    queryKey: ["sales-data"],
    queryFn: () => getSalesDataApi(),
  });

  // delete sale data
  const { mutate: mutationDeleteSalesData } = useMutation({
    mutationFn: deleteSalesDataApi,
    onSuccess: () => {
      setIsConfirmationModelOpen();
      toast.success("Deleted successfully", { duration: 2000 });
      queryClient.invalidateQueries({
        queryKey: ["sales-data"],
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data;
      toast.error(message || "Something went wrong", {
        duration: 1200,
      });
    },
  });

  /**
   * =========================== EVENT-HANDLER ==========================
   */

  const handleDelete = ({ original }: { original: any }) => {
    const selectedData = { ...original, purchase_id: original.id };
    setIsConfirmationModelOpen(selectedData);
  };

  // formatted columns data
  const formattedCols = useMemo(() => {
    return formattedSalesTableColumns(commonCols);
  }, [commonCols]);

  /**
   * TSX
   */
  return (
    <div>
      <ConfirmationModel
        message="Are you sure you want to delete ?"
        handleConfirm={() => {
          mutationDeleteSalesData(selectedData);
        }}
        open={isConfirmationModelOpen}
        handleClose={setIsConfirmationModelOpen}
      />
      <SalesModel />
      <CommonTable
        enableEditing
        enableDelete
        openDeleteConfirmModal={handleDelete}
        isLoading={isLoading}
        topToolbarComp={
          <div>
            <button
              onClick={setIsModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Sale
            </button>
          </div>
        }
        rows={salesRowsData || []}
        columns={formattedCols}
      />
    </div>
  );
};

export default SalesTable;
