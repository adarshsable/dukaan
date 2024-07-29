import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import InputField from "../fields/InputField";
// services
import { addCompanyAndCategoryDataApi } from "@/services/Options";

const AddCategory = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState("");

  // =================== API CALL'S START ======================

  const { mutate: mutateAddCompanyAndCategoryData } = useMutation({
    mutationFn: addCompanyAndCategoryDataApi,
    onSuccess: () => {
      setCategory("");
      toast.success("Added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["company-category"],
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data;
      toast.error(message || "Something went wrong", {
        duration: 1200,
      });
    },
  });

  // ===================== EVENT-HANDLER =======================

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateAddCompanyAndCategoryData({ category, company: "Others" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  /**
   * TSX
   */
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <InputField
        id="category"
        width="35rem"
        label="Category"
        value={category}
        handleChange={handleInputChange}
        placeholder="Enter product name..."
      />

      <button
        type="submit"
        disabled={category?.length < 4}
        className="disabled:bg-slate-300 bg-lightDark text-white py-2 px-4 hover:bg-slate-500 rounded-sm shadow-md"
      >
        submit
      </button>
    </form>
  );
};

export default AddCategory;
