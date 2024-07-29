import { useNavigate } from "react-router-dom";
// components
import ItemCard from "@/components/cards/ItemCard";
// services
import { usePartyDetails } from "@/hooks/usePartyDetails";

const PartyCard = () => {
  const navigate = useNavigate();

  // =================== API CALL'S START ======================

  // Query to fetch all party data
  const { data: partiesData = [], isLoading } = usePartyDetails();

  /**
   * TSX
   */
  return (
    <div>
      <ItemCard
        data={partiesData}
        isLoading={isLoading}
        handleClick={(item) => navigate(`/parties/${item.id}`)}
      />
    </div>
  );
};

export default PartyCard;
