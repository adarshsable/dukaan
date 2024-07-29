import toast from "react-hot-toast";
import { FormEvent, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import { Fields } from "@/components/common/type";
import BasicModal from "@/components/model/BasicModel";
import AddProductDetailsForm from "@/components/common/AddProductDetailsForm";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { formInputFieldsData } from "@/data/options";
import { addPartyReturnDataApi } from "@/services/Return";

const ReturnModel = ({ partyId }: { partyId: string }) => {
  const queryClient = useQueryClient();

  const { isModelOpen, setIsModelOpen, formData, setResetFormData } =
    usePurchaseStore();

  const {
    categoryOptions = [],
    companyOptions = {},
    productOptions = {},
  } = useProduct();

  // =================== API CALL'S START ======================

  // Mutation to add party return data
  const { mutate: mutateAddReturnData } = useMutation({
    mutationFn: addPartyReturnDataApi,
    onSuccess: () => {
      setResetFormData();
      toast.success("Added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["return-data", partyId],
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
    mutateAddReturnData({ ...formData, party_id: partyId });
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
        title="Add Return Record"
      >
        <AddProductDetailsForm
          enableOrder
          disableCheckBox
          handleSubmit={handleSubmitForm}
          formInputFieldsData={formInputFieldsData}
          formDropdownFieldsData={formDropdownFieldsData}
        />
      </BasicModal>
    </div>
  );
};

export default ReturnModel;
