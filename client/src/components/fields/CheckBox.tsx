import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

interface CheckBoxProps {
  label: string;
  width?: string;
  isChecked: boolean;
  setChecked: () => void;
}

export default function CheckBox({
  setChecked,
  width = "100%",
  label = "label",
  isChecked = false,
}: CheckBoxProps) {
  return (
    <FormControlLabel
      sx={{ width }}
      label={label}
      control={<Checkbox checked={isChecked} onChange={setChecked} />}
    />
  );
}
