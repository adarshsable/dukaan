import { FormEvent } from "react";

type Options = { label: string; value: string };

export type Fields = {
  id: string;
  label: string;
  width: string;
  type?: string;
  options?: Options[];
  placeholder?: string;
  inputField?: "text" | "number" | undefined;
};

export interface AddProductDetailsFormProps {
  enableOrder?: boolean;
  disableCheckBox?: boolean;
  formInputFieldsData: Fields[];
  formDropdownFieldsData: Fields[];
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
