import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOptionsDataApi } from "@/services/Options";

type Options = { label: string; value: string; id: string | number };

type OptionsData = {
  [category: string]: string[];
};

type FormattedOptions = {
  companyOptions: { [category: string]: Options[] };
  categoryOptions: Options[];
};

export const useCompanyAndCategory = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: options = {} } = useQuery<OptionsData>({
    queryKey: ["company-category"],
    queryFn: () => getAllOptionsDataApi(),
  });

  /**
   * ======================= FORMATE THE DATA =====================
   */

  const formattedOptions: FormattedOptions = useMemo(() => {
    if (Object.keys(options).length === 0)
      return { companyOptions: {}, categoryOptions: [] };

    const companyOptions: { [category: string]: Options[] } = {};
    const categoryOptions: Options[] = [];

    //  format options for the category & company
    Object.entries(options).forEach(([category, companyList]) => {
      categoryOptions.push({ label: category, value: category, id: category });

      const formattedCompanyList = companyList?.map((name: string) => {
        return { label: name, value: name, id: name };
      });

      companyOptions[category] = formattedCompanyList;
    });

    return { companyOptions, categoryOptions };
  }, [options]);

  return {
    companyOptions: formattedOptions.companyOptions,
    categoryOptions: formattedOptions.categoryOptions,
  };
};
