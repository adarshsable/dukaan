import { create } from "zustand";

interface ConfirmationModelState {
  selectedData: { [key: string]: any } | null;
  isConfirmationModelOpen: boolean;
  setIsConfirmationModelOpen: (
    selectedData?: { [key: string]: any } | null
  ) => void;
}

export const useConfirmationStore = create<ConfirmationModelState>((set) => ({
  selectedData: null,
  isConfirmationModelOpen: false,
  setIsConfirmationModelOpen: (selectedData = null) => {
    set((state) => {
      const data = !state.isConfirmationModelOpen ? selectedData : null;

      return {
        ...state,
        selectedData: data,
        isConfirmationModelOpen: !state.isConfirmationModelOpen,
      };
    });
  },
}));
