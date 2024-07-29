import React from "react";
import { CgClose } from "react-icons/cg";

interface BasicModalProps {
  title: string;
  isOpen: boolean;
  modalWidth?: string;
  onClose: () => void;
  modalHeight?: string;
  children: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = ({
  isOpen = false,
  onClose,
  children,
  title = "title",
  modalWidth = "40vw",
  modalHeight = "40vh",
}) => {
  if (!isOpen) return null;

  /**
   * TSX
   */
  return (
    <div className="w-full h-[100vh] fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div
        className="bg-white rounded-lg shadow-lg py-2 px-4"
        style={{ width: modalWidth, height: modalHeight }}
      >
        {/*=========== header ==========*/}

        <div className="relative w-full py-2 px-6">
          <h3 className="text-center font-[550] text-mediumDark text-2xl capitalize">
            {title}
          </h3>
          <div
            onClick={onClose}
            className="absolute top-1 right-1 text-xl cursor-pointer hover:bg-slate-200 p-2 rounded-full"
          >
            <CgClose />
          </div>
        </div>
        {/*=========== body =============*/}
        <div className="children w-full h-[100%] p-2">{children}</div>
      </div>
    </div>
  );
};

export default BasicModal;
