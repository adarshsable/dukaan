// import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPartiesDataApi } from "@/services/Party";

export type PartyDetailsReponse = {
  name: string;
  contact: number;
  shopName: string;
  id: string;
  value?: string;
  label: string;
};

export const usePartyDetails = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data = [], isLoading } = useQuery<PartyDetailsReponse[]>({
    queryKey: ["all-party-details"],
    queryFn: () => getAllPartiesDataApi(),
  });

  return { data, isLoading };
};
