import dayjs from "dayjs";
import { create } from "zustand";

interface FormDataPayment {
  date: string;
  payment: number;
  order_id: string;
  payment_mode: string;
}

interface PendingPaymenState {
  selectedData: any | null;
  isDetailModelOpen: boolean;
  setIsDetailModelOpen: (selectedData?: { [key: string]: any } | null) => void;

  isPaymentModelOpen: boolean;
  setIsPaymentModelOpen: () => void;

  formData: FormDataPayment;
  setFormData: (name: string, value: any) => void;

  isFormValid: boolean;
  setIsFormValid: () => void;

  setReset: () => void;
}

const defaultFormData = {
  payment: 0,
  order_id: "",
  payment_mode: "Account",
  date: dayjs().format("YYYY-MM-DD"),
};

export const usePendingPaymentStore = create<PendingPaymenState>((set) => ({
  selectedData: null,
  isDetailModelOpen: false,
  setIsDetailModelOpen: (selectedData = null) => {
    set((state) => {
      const data = !state.isDetailModelOpen ? selectedData : null;

      return {
        ...state,
        selectedData: data,
        isDetailModelOpen: !state.isDetailModelOpen,
      };
    });
  },

  isPaymentModelOpen: false,
  setIsPaymentModelOpen: () => {
    set((state) => {
      return {
        ...state,
        isPaymentModelOpen: !state.isPaymentModelOpen,
      };
    });
  },

  setReset: () => {
    set((state) => {
      return {
        ...state,
        formData: defaultFormData,
        isPaymentModelOpen: false,
      };
    });
  },

  formData: defaultFormData,
  setFormData: (name, value) => {
    set((state) => {
      return {
        ...state,
        formData: { ...state.formData, [name]: value },
      };
    });
  },

  isFormValid: false,
  setIsFormValid: () => {
    set((state) => {
      const formsData = state.formData;

      const isOrderID = formsData.order_id.trim().length > 0;
      const isPayment = formsData.payment.toString().trim().length > 0;
      const isPaymentMode = formsData.payment_mode.trim().length > 0;
      const isValid = isOrderID && isPayment && isPaymentMode;

      return {
        ...state,
        isFormValid: isValid,
      };
    });
  },
}));
