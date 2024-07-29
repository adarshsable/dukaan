import { FormEvent, useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// service
import { addPurchaseDataApi } from "@/services/Purchase";
// components
import { Fields } from "@/components/common/type";
import BasicModal from "@/components/model/BasicModel";
import AddProductDetailsForm from "@/components/common/AddProductDetailsForm";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { formInputFieldsData } from "@/data/options";

const PurchaseModal = ({ partyId }: { partyId: string }) => {
  const queryClient = useQueryClient();

  const { isModelOpen, setIsModelOpen, formData, setResetFormData } =
    usePurchaseStore();

  const {
    categoryOptions = [],
    companyOptions = {},
    productOptions = {},
  } = useProduct();

  // =================== API CALL'S START ======================

  // Mutation to add party purchase data
  const { mutate: mutateAddPurchaseData } = useMutation({
    mutationFn: addPurchaseDataApi,
    onSuccess: () => {
      setResetFormData();
      toast.success("Added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["purchase-data", partyId],
      });
    },
    onError: (err: any) => {
      const message = err.response.data;
      toast.error(message || "Error while adding sales data", {
        duration: 1200,
      });
    },
  });

  const formDropdownFieldsData: Fields[] = useMemo(() => {
    return [
      {
        id: "category",
        width: "100%",
        type: "dropdown",
        label: "Category",
        options: categoryOptions,
      },
      {
        id: "product",
        options: productOptions[formData.category],
        width: "100%",
        type: "dropdown",
        label: "Product",
      },
      {
        id: "company",
        options: companyOptions[formData.category],
        width: "100%",
        type: "dropdown",
        label: "Company",
      },
    ];
  }, [companyOptions, productOptions, categoryOptions, formData.category]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAddPurchaseData({
      ...formData,
      party_id: partyId,
      order_id: formData.orderId,
    });
  };

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        modalWidth="45rem"
        isOpen={isModelOpen}
        modalHeight="fitContent"
        onClose={setIsModelOpen}
        title="Add Purchase Record"
      >
        <AddProductDetailsForm
          enableOrder
          handleSubmit={handleSubmitForm}
          formInputFieldsData={formInputFieldsData}
          formDropdownFieldsData={formDropdownFieldsData}
        />
      </BasicModal>
    </div>
  );
};

export default PurchaseModal;
