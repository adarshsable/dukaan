import dayjs from "dayjs";
import { useState } from "react";
import { DateRangeType } from "@/store/globalStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface BasicDateRangePicker {
  setDateRangeChange: (value: DateRangeType) => void;
}

export default function BasicDateRangePicker({
  setDateRangeChange,
}: BasicDateRangePicker) {
  const [date, setDate] = useState<{
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
  }>({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const handleEndDateChange = (newDate: dayjs.Dayjs | any, date: string) => {
    setDate((prev) => ({ ...prev, [date]: newDate }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDateRangeChange({
      startDate: dayjs(date.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(date.startDate).format("YYYY-MM-DD"),
    });
  };

  /**
   * TSX
   */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <form
          onSubmit={handleSubmit}
          className="w-fit bg-white flex gap-2 px-6 py-4 shadow-md rounded-md"
        >
          <DatePicker
            format="DD-MMM-YY"
            label="Start Date"
            maxDate={date.endDate}
            value={date.startDate}
            onChange={(newValue) => handleEndDateChange(newValue, "startDate")}
          />
          <DatePicker
            label="End Date"
            format="DD-MMM-YY"
            value={date.endDate}
            minDate={date.startDate}
            onChange={(newValue) => handleEndDateChange(newValue, "endDate")}
          />
          <button
            type="submit"
            className="bg-lightDark text-white px-4 py-1 rounded-sm shadow-md hover:bg-slate-500"
          >
            submit
          </button>
        </form>
      </DemoContainer>
    </LocalizationProvider>
  );
}
