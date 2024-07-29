import dayjs from "dayjs";
import { create } from "zustand";

export type DateRangeType = {
  startDate: string;
  endDate: string;
};

interface GlobalState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  isStockModelOpen: boolean;
  setIsStockModelOpen: () => void;

  selectedDateRange: DateRangeType;
  setSelectedDateRabge: (value: DateRangeType) => void;
}

export const useGlobleStore = create<GlobalState>((set) => ({
  // filter option model
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  isStockModelOpen: false,
  setIsStockModelOpen: () => {
    set((state) => ({ ...state, isStockModelOpen: !state.isStockModelOpen }));
  },

  selectedDateRange: {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  },
  setSelectedDateRabge: (value) => {
    set((state) => ({ ...state, selectedDateRange: value }));
  },
}));
