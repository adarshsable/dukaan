import { ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import BasicModal from "@/components/model/BasicModel";
import InputField from "@/components/fields/InputField";
// store
import { usePartyStore } from "@/store/partyStore";
import { getAddPartyNameDataApi } from "@/services/Party";
import toast from "react-hot-toast";

const AddPartyModel = () => {
  const queryClient = useQueryClient();

  const {
    setReset,
    isModelOpen,
    isFormDataValid,
    validateFormData,
    formData,
    setFormData,
  } = usePartyStore();

  // =================== API CALL'S START ======================

  // Mutation to add party name
  const { mutate: mutateAddPartNameData } = useMutation({
    mutationFn: getAddPartyNameDataApi,
    onSuccess: () => {
      setReset();
      toast.success("Added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["all-party-details"],
      });
    },
    onError: (err: any) => {
      const message = err.response.data;
      toast.error(message || "Error while adding sales data", {
        duration: 1200,
      });
    },
  });

  // ===================== EVENT_HANDLER ======================

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(name, value);
    validateFormData();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setReset();

    const { name, shop, contact } = formData;

    mutateAddPartNameData({ party_name: name, shop_name: shop, contact });
  };

  /**
   * TSX
   */
  return (
    <BasicModal
      title="Add Party"
      modalHeight="heightFit"
      modalWidth="30rem"
      isOpen={isModelOpen}
      onClose={setReset}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          width="100%"
          label="Party Name"
          id="name"
          value={formData.name}
          handleChange={handleInputChange}
          placeholder="Enter party name..."
        />

        <InputField
          width="100%"
          label="Shop Name"
          id="shop"
          value={formData.shop}
          handleChange={handleInputChange}
          placeholder="Enter shop name..."
        />
        <InputField
          type="number"
          width="100%"
          label="Contact"
          id="contact"
          value={formData.contact}
          handleChange={handleInputChange}
          placeholder="Enter contact number..."
        />

        <button
          type="submit"
          disabled={!isFormDataValid}
          className="disabled:bg-slate-300 bg-mediumDark px-4 py-2 shadow-md rounded-sm text-white hover:bg-slate-600"
        >
          Submit
        </button>
      </form>
    </BasicModal>
  );
};

export default AddPartyModel;
