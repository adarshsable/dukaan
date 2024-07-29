// components
import PartyCard from "./(components)/PartyCard";
import AddPartyModel from "./(components)/AddPartyModel";
// store
import { usePartyStore } from "@/store/partyStore";

const Party = () => {
  const { setIsModelOpen } = usePartyStore();

  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-lightDark py-4 px-6 rounded-md">
        <div className="text-white text-2xl">Party Overview</div>
        <div>
          <button
            onClick={setIsModelOpen}
            className="bg-blue-400 text-white px-2 py-1 rounded-sm shadow-md text-xl bg-med"
          >
            &#x2b; Add New
          </button>
        </div>
      </div>
      <AddPartyModel />
      {/*=========== ALL PARTIES CARD ===========*/}
      <div className="mt-8">
        <PartyCard />
      </div>
    </div>
  );
};

export default Party;
