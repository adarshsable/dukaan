import { FC } from "react";
import { Dialog } from "@mui/material";

interface ConfirmationModelProps {
  open: boolean;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmationModel: FC<ConfirmationModelProps> = ({
  open,
  message,
  handleClose,
  handleConfirm,
}) => {
  /**
   * TSX
   */
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="w-[22rem] h-[10rem] flex flex-col justify-center items-center gap-8">
        <div className="px-4">
          <p className="text-lightDark text-xl">{message}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClose}
            className="bg-red-400 hover:bg-red-500 rounded-sm shadow-md w-[5rem] py-1"
          >
            No
          </button>
          <button
            onClick={handleConfirm}
            className="bg-emerald-400 rounded-sm shadow-md w-[5rem] py-1 hover:bg-emerald-500"
          >
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModel;
