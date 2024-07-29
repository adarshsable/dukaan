import toast from "react-hot-toast";
import { FormEvent, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import DetailsModel from "./DetailsModel";
import PaymentModel from "./PaymentModel";
import CommonTable from "../table/CommonTable";
// services
import {
  addPartyPaymentDataApi,
  getPartyPendingPaymentDataApi,
} from "@/services/PendingPayment";
// data
import { pendingPaymentCols } from "@/data/CommonTable";
import { formattedPendingPaymentTableColumns } from "./func";
// store
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";

const PendingPaymentTable = ({ partyId = "" }: { partyId: string }) => {
  const queryClient = useQueryClient();

  const { formData, setIsDetailModelOpen, setIsPaymentModelOpen, setReset } =
    usePendingPaymentStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPendingPaymentRowsData = [], isLoading } = useQuery({
    queryKey: ["pending-payment-data", partyId],
    queryFn: () => getPartyPendingPaymentDataApi(partyId),
  });

  // delete purchase data
  const { mutate: mutationAddPartyPaymentData } = useMutation({
    mutationFn: addPartyPaymentDataApi,
    onSuccess: () => {
      setReset();
      toast.success("Added successfully", { duration: 1500 });
      queryClient.invalidateQueries({
        queryKey: ["pending-payment-data", partyId],
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data;
      toast.error(message || "Something went wrong", {
        duration: 2200,
      });
    },
  });

  /**
   * =========================== EVENT-HANDLER ==========================
   */

  // formatted columns data
  const formattedCols = useMemo(() => {
    return formattedPendingPaymentTableColumns(pendingPaymentCols);
  }, [pendingPaymentCols]);

  // submit pending payment data
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutationAddPartyPaymentData({
      ...formData,
      party_id: partyId,
    });
  };

  /**
   * TSX
   */
  return (
    <div>
      <DetailsModel />
      <PaymentModel handleSubmitForm={handleSubmitForm} />
      <CommonTable
        enableEditing
        enableViewDetails
        isLoading={isLoading}
        openDetailsModal={setIsDetailModelOpen}
        topToolbarComp={
          <div>
            <button
              onClick={setIsPaymentModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Payment
            </button>
          </div>
        }
        rows={partyPendingPaymentRowsData || []}
        columns={formattedCols}
      />
    </div>
  );
};

export default PendingPaymentTable;
