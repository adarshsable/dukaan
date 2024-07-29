import { useMemo } from "react";
import { useParams } from "react-router-dom";
// components
import Return from "@/components/return";
import PurchaseTable from "./PurchaseTable";
import BasicTab from "@/components/common/BasicTab";
import PaymentTable from "@/components/cards/PaymentTable";
import PendingPaymentTable from "@/components/pendingPayment";
// hooks
import { PartyDetailsReponse, usePartyDetails } from "@/hooks/usePartyDetails";
import BasicDateRangePicker from "@/components/fields/DateRangePicker";
import { useGlobleStore } from "@/store/globalStore";

const tabsData = [
  {
    label: "Purchase Record",
    value: "Purchase Record",
    content: PurchaseTable,
  },
  {
    label: "Pending Payment Record",
    value: "Pending Payment Record",
    content: PendingPaymentTable,
  },
  {
    label: "Payment Record",
    value: "Payment Record",
    content: PaymentTable,
  },
  {
    label: "Return Record",
    value: "Return Record",
    content: Return,
  },
];

const PartyDetails = () => {
  const { id: partyId } = useParams();
  const { setSelectedDateRabge } = useGlobleStore();
  const { data: partiesData = [], isLoading } = usePartyDetails();

  const partyDetails = useMemo(() => {
    return (
      partiesData?.find((item) => item.id === partyId) ||
      ({} as PartyDetailsReponse)
    );
  }, [partiesData]);

  const data = { partyId: partyId };

  /**
   * ======================= LOADING & ERROR =====================
   */

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex justify-center items-center ">
        <div className="bg-white rounded-sm shadow-md px-6 py-4 text-mediumDark text-2xl">
          Fetching party details....
        </div>
      </div>
    );
  }

  if (Object.keys(partyDetails).length === 0) {
    return (
      <div className="h-[60vh] w-full flex justify-center items-center ">
        <div className="bg-white rounded-sm shadow-md px-6 py-4 text-mediumDark text-2xl">
          Party Not Found
        </div>
      </div>
    );
  }

  /**
   * TSX
   */
  return (
    <div className="relative w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-2 bg-lightDark py-4 px-6 rounded-md">
        <div className="flex gap-6">
          <div className="text-white text-2xl capitalize font-[550]">
            owner : <span className="font-normal">{partyDetails.name}</span>
          </div>
          <div className="text-white text-2xl capitalize font-[550]">
            Shop : <span className="font-normal">{partyDetails.shopName}</span>
          </div>
        </div>

        <div>
          <button
            // onClick={setIsModelOpen}
            className="bg-rose-400 text-white px-2 py-1 rounded-sm shadow-md text-xl bg-med"
          >
            Contact : {partyDetails.contact}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <BasicDateRangePicker setDateRangeChange={setSelectedDateRabge} />
      </div>

      <div className="mt-4">
        <BasicTab tabData={tabsData} data={data} />
      </div>
      <br />
      <br />
    </div>
  );
};

export default PartyDetails;
