import { useState, useMemo } from "react";
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import type { Range, OnChangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../styles/calenderStyleOverride.css";
import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { useParams } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import type { Booking } from "../../types/venue";

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
  const { id: venueId } = useParams();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const token = localStorage.getItem("token");
  const userFetchOptions = useMemo(
    () => ({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_TOKEN,
      },
    }),
    [token]
  );
  const url = "https://v2.api.noroff.dev/holidaze/bookings?_venue=true";
  const {
    data: bookings,
    isLoading,
    isError,
  } = useApi<Booking>(url, userFetchOptions);

  const matchingVenueAndBooking = bookings?.filter(
    (booking) => booking.venue.id === venueId
  );

  function getDatesBetween(start: Date, end: Date) {
    const dates: [] = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const disabledDates = useMemo(() => {
    if (!matchingVenueAndBooking) return [];
    const allDates: Date[] = [];

    matchingVenueAndBooking.forEach((booking) => {
      const startDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);
      const dates = getDatesBetween(startDate, endDate);
      allDates.push(...dates);
    });

    return allDates;
  }, [matchingVenueAndBooking]);

  const onVenuePage = Boolean(venueId);
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

  console.log(disabledDates);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

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
          disabledDates={disabledDates}
          moveRangeOnFirstSelection={false}
          ranges={range}
          className="absolute z-50 w-full"
        />
      )}
    </>
  );
}

export default DatePicker;
