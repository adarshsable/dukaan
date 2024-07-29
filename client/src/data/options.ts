import { Fields } from "@/components/common/type";

export const formInputFieldsData: Fields[] = [
  {
    id: "price",
    label: "Price",
    width: "60%",
    inputField: "number",
    type: "input",
    placeholder: "enter price...",
  },
  {
    width: "20%",
    type: "input",
    id: "quantity",
    inputField: "number",
    label: "Quantity",
    placeholder: "enter quantity...",
  },
  {
    id: "weight",
    type: "input",
    width: "20%",
    label: "Weight",
    inputField: "text",
    placeholder: "enter weight...",
  },
];
