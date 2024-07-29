import { create } from "zustand";

interface PartyState {
  isModelOpen: boolean;
  setIsModelOpen: () => void;

  isFormDataValid: boolean;
  validateFormData: () => void;

  formData: { name: string; contact: number; shop: string };
  setFormData: (name: string, value: string | number) => void;

  setReset: () => void;
}

export const usePartyStore = create<PartyState>((set) => ({
  isModelOpen: false,
  setIsModelOpen: () => {
    set((state) => ({ ...state, isModelOpen: !state.isModelOpen }));
  },

  isFormDataValid: false,
  validateFormData: () => {
    set((state) => {
      const { name, contact, shop } = state.formData;
      const isValid =
        name.trim() !== "" &&
        shop.trim() !== "" &&
        contact.toString().length === 10;
      return { isFormDataValid: isValid };
    });
  },

  formData: { name: "", contact: 0, shop: "" },
  setFormData: (name, value) => {
    set((state) => {
      const updatedFormData = { ...state.formData, [name]: value };
      return {
        formData: updatedFormData,
        isFormDataValid: name === "contact" || state.isFormDataValid,
      };
    });
  },

  setReset: () => {
    set({
      isModelOpen: false,
      formData: { name: "", contact: 0, shop: "" },
      isFormDataValid: false,
    });
  },
}));
