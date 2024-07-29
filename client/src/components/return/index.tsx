import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReturnModel from "./ReturnModel";
import CommonTable from "@/components/table/CommonTable";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { useConfirmationStore } from "@/store/confirmationModelStore";
import {
  deletePartyReturnDataApi,
  getPartyReturnDataApi,
} from "@/services/Return";
import ConfirmationModel from "../model/ConfirmationModel";
import { useMemo } from "react";
import { formattedSalesTableColumns } from "@/pages/party/data/func";
import { commonCols } from "@/data/CommonTable";

const Return = ({ partyId }: { partyId: string }) => {
  const queryClient = useQueryClient();
  const { setIsModelOpen, setIsChecked } = usePurchaseStore();

  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedData } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPurchaseReturnRowsData = [], isLoading } = useQuery({
    queryKey: ["return-data", partyId],
    queryFn: () => getPartyReturnDataApi(partyId),
  });

  // delete purchase data
  const { mutate: mutationDeletePartyPurchaseData } = useMutation({
    mutationFn: deletePartyReturnDataApi,
    onSuccess: () => {
      setIsConfirmationModelOpen();
      toast.success("Deleted successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["return-data", partyId],
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

  const handleClick = () => {
    setIsModelOpen();
    setIsChecked(true);
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
          mutationDeletePartyPurchaseData(selectedData);
        }}
        open={isConfirmationModelOpen}
        handleClose={setIsConfirmationModelOpen}
      />
      <ReturnModel partyId={partyId} />
      <CommonTable
        enableEditing
        enableDelete
        openDeleteConfirmModal={handleDelete}
        isLoading={isLoading}
        topToolbarComp={
          <div>
            <button
              onClick={handleClick}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Return
            </button>
          </div>
        }
        rows={partyPurchaseReturnRowsData || []}
        columns={formattedCols}
      />
    </div>
  );
};

export default Return;
