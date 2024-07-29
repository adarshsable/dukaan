import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface BasicDatePickerProps {
  value: any;
  label?: string;
  width?: string;
  setDateChange: (value: any) => void;
}

export default function BasicDatePicker({
  value = null,
  setDateChange,
  label = "Date",
  width = "100%",
}: BasicDatePickerProps) {
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      setDateChange(newDate.format("YYYY-MM-DD"));
    } else {
      setDateChange(null);
    }
  };

  /**
   * TSX
   */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div style={{ marginTop: "-0.5rem", width: width }}>
          <DatePicker
            format="DD-MMM-YY"
            value={dayjs(value)}
            label={label}
            onChange={(newValue) => handleDateChange(newValue)}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
