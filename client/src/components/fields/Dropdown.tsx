import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Options = { label: string; value: string };

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: Options[];
  isDisabled?: boolean;
  width?: number | string;
  setInputChange: (newValue: string) => void;
}

export default function Dropdown({
  id,
  options = [],
  value,
  width = 300,
  setInputChange,
  label = "label",
  isDisabled = false,
}: DropdownProps) {
  /**
   * TSX
   */
  return (
    <div style={{ width }}>
      <Autocomplete
        id={id}
        sx={{ width: "100%" }}
        value={options.find((option) => option.value === value) || null}
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(_event, newValue) =>
          setInputChange(newValue ? newValue.value : "")
        }
        renderInput={(params) => (
          <TextField {...params} label={label} disabled={isDisabled} />
        )}
      />
    </div>
  );
}

{
  /* <Dropdown
options={options}
id="pary"
value={null}
label="party"
setInputChange={() => {}}
/> */
}
