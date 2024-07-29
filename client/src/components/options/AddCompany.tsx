import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
// services
import { addCompanyAndCategoryDataApi } from "@/services/Options";
// data
import toast from "react-hot-toast";
import { useCompanyAndCategory } from "@/hooks/useCompanyAndCategory";

const AddCompany = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    company: "",
    category: "",
  });

  // =================== API CALL'S START ======================

  // Query to fetch all options data
  const { categoryOptions = [] } = useCompanyAndCategory();

  const { mutate: mutateAddCompanyAndCategoryData } = useMutation({
    mutationFn: addCompanyAndCategoryDataApi,
    onSuccess: () => {
      setFormData({ company: "", category: "" });
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

    mutateAddCompanyAndCategoryData(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, company: e.target.value });
  };

  /**
   * TSX
   */
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <InputField
        id="company"
        width="35rem"
        label="Company"
        value={formData.company}
        handleChange={handleInputChange}
        placeholder="Enter product name..."
      />

      <Dropdown
        id="category"
        width="15rem"
        label="Category"
        value={formData.category}
        options={categoryOptions}
        setInputChange={(value: string) => {
          setFormData((prev) => ({ ...prev, category: value }));
        }}
      />

      <button
        type="submit"
        disabled={
          formData?.category?.length < 4 && formData?.category?.length < 4
        }
        className="disabled:bg-slate-300 bg-lightDark text-white py-2 px-4 hover:bg-slate-500 rounded-sm shadow-md"
      >
        submit
      </button>
    </form>
  );
};

export default AddCompany;
