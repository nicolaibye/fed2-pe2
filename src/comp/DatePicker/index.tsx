import { useState } from "react";
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import type { Range, OnChangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../styles/calenderStyleOverride.css";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { matchPath } from "react-router-dom";

function DatePicker() {
  const {
    isSummary: searchSummary,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setNumberOfDays,
  } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const onVenuePage = matchPath("venue/:id", location.pathname) !== null;
  const inputChecker = !onVenuePage && searchSummary;

  function handleDateChange(item: OnChangeProps) {
    const selection = item.selection;

    setRange([selection]);

    const newStartDate = selection.startDate;
    const newEndDate = selection.endDate;

    if (newStartDate) {
      setStartDate(newStartDate);
    }

    if (newEndDate) {
      setEndDate(newEndDate);
    }

    if (newStartDate && newEndDate) {
      setNumberOfDays(differenceInDays(newEndDate, newStartDate));
    }
  }

  const formatted =
    startDate && endDate
      ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
      : "Dates";

  return (
    <>
      <input
        type="text"
        readOnly
        onClick={() => setOpen(!open)}
        value={formatted}
        placeholder="Dates"
        className={`input-field ${inputChecker ? "hidden" : ""} cut-corner`}
      />
      {open && (
        <DateRange
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="absolute z-50 w-full"
        />
      )}
    </>
  );
}

export default DatePicker;
