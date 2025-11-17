import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import type { Range, OnChangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";

function DatePicker() {
  const { isSummary: searchSummary } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const formatted =
    range[0].startDate && range[0].endDate
      ? `${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}`
      : "Dates";

  return (
    <>
      <input
        type="text"
        readOnly
        onClick={() => setOpen(!open)}
        value={formatted}
        placeholder="Dates"
        className={`input-field ${searchSummary ? "hidden peer-checked:flex" : ""} cut-corner`}
      />
      {open && (
        <DateRange
          onChange={(item: OnChangeProps) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="absolute top-16 z-50 w-full"
        />
      )}
    </>
  );
}

export default DatePicker;
