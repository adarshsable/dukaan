import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  width?: string;
  isError?: boolean;
  placeholder: string;
  onClick?: () => void;
  type?: "text" | "number";
  size?: "small" | "medium";
  value: string | number | null;
  variant?: "outlined" | "filled" | "standard";
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  onClick,
  value = null,
  type = "text",
  handleChange,
  label = "label",
  width = "20rem",
  size = "medium",
  placeholder = "label",
  variant = "outlined",
  isError = false,
}: InputFieldProps) {
  /**
   * TSX
   */
  return (
    <TextField
      id={id}
      autoComplete="off"
      spellCheck="false"
      name={id}
      type={type}
      size={size}
      label={label}
      sx={{ width }}
      error={isError}
      onClick={onClick}
      variant={variant}
      onChange={handleChange}
      placeholder={placeholder}
      value={type === "number" && value === 0 ? "" : value}
    />
  );
}

{
  /* <InputField
handleChange={() => {}}
id="add-party"
label="Party"
value={null}
placeholder="Enter party name..."
/> */
}
