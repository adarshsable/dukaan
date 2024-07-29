import dayjs from "dayjs";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import CommonTable from "../table/CommonTable";
import ConfirmationModel from "../model/ConfirmationModel";
import { paymentCols } from "@/data/CommonTable";
// services
import {
  deletePartyPaymentDataApi,
  getPartyPaymentDataApi,
} from "@/services/PendingPayment";
import { useConfirmationStore } from "@/store/confirmationModelStore";
import toast from "react-hot-toast";

const PaymentTable = ({ partyId = "" }: { partyId: string }) => {
  const queryClient = useQueryClient();

  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedData } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party payment data
  const { data: partyPaymentRowsData = [], isLoading } = useQuery({
    queryKey: ["party-payment-data", partyId],
    queryFn: () => getPartyPaymentDataApi(partyId),
  });

  // delete purchase data
  const { mutate: mutationDeletePartyPaymentData } = useMutation({
    mutationFn: deletePartyPaymentDataApi,
    onSuccess: () => {
      setIsConfirmationModelOpen();
      toast.success("Deleted successfully", { duration: 1500 });
      queryClient.invalidateQueries({
        queryKey: ["party-payment-data", partyId],
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data;
      toast.error(message || "Something went wrong", {
        duration: 2200,
      });
    },
  });

  const formattedCols = useMemo(() => {
    if (paymentCols.length === 0) return [];

    return paymentCols?.map(
      ({ header, accessorkey }: { header: string; accessorkey: string }) => {
        return {
          header: header,
          id: accessorkey,
          accessorkey: accessorkey,
          accessorFn: (row: any) => row[accessorkey],
          Cell: ({ row }: { row: any }) => {
            const rowValue = row.original[accessorkey];

            if (accessorkey === "order_id")
              return (
                <p className="max-w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap bg-gray-100 p-2 rounded">
                  {rowValue}
                </p>
              );

            if (accessorkey === "payment") return `Rs ${rowValue}`;

            if (accessorkey === "date") {
              const date = dayjs(rowValue).format("DD-MMM-YYYY");
              return date;
            }

            return rowValue;
          },
        };
      }
    );
  }, [paymentCols]);

  return (
    <div>
      <ConfirmationModel
        message="Are you sure you want to delete payment data ?"
        handleConfirm={() => {
          mutationDeletePartyPaymentData(selectedData);
        }}
        open={isConfirmationModelOpen}
        handleClose={setIsConfirmationModelOpen}
      />
      <CommonTable
        enableEditing
        enableDelete
        isLoading={isLoading}
        columns={formattedCols}
        rows={partyPaymentRowsData || []}
        openDeleteConfirmModal={setIsConfirmationModelOpen}
      />
    </div>
  );
};

export default PaymentTable;
