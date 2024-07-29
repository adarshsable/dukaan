// components
import AddProduct from "./AddProduct";
import AddCompany from "./AddCompany";
import BasicTab from "../common/BasicTab";
import BasicModal from "../model/BasicModel";
// store
import { useGlobleStore } from "@/store/globalStore";
import AddCategory from "./AddCategory";

const tabsData = [
  {
    label: "Add Product",
    value: "Add Product",
    content: <AddProduct />,
  },
  { label: "Add Company", value: "Add Company", content: <AddCompany /> },
  { label: "Add Category", value: "Add Category", content: <AddCategory /> },
];

const Options = () => {
  const { isModelOpen, setIsModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <BasicModal
      modalWidth="40vw"
      modalHeight="contentFit"
      isOpen={isModelOpen}
      onClose={setIsModelOpen}
      title="Add Options"
    >
      <BasicTab tabData={tabsData} />
    </BasicModal>
  );
};

export default Options;
