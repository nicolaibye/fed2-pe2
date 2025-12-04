import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import type { Venue } from "../../types/venue";

function MobileReserveBar() {
  const { startDate, endDate, numberOfDays } = useSearchContext();
  const url = "https://v2.api.noroff.dev/holidaze/venues";
  const { id } = useParams();
  const { data: post } = useApi<Venue>(url + `/${id}`);
  const price = post?.price || 0;

  const formatted =
    startDate && endDate
      ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
      : "Dates";
  return (
    <div className="fixed bottom-15 left-0 w-full h-14 md:hidden bg-hdRed text-hdWhite flex gap-8 items-center justify-center z-1000">
      <div className="absolute inset-1 bg-[url(/SwirlPattern.svg)] w-full h-full top-0 left-0 bg-repeat"></div>
      <div className="flex flex-col items-start text-sm font-light z-1001">
        <p>
          <span className="font-bold">£{price * numberOfDays}</span> for{" "}
          {numberOfDays} nights
        </p>
        <p>{formatted}</p>
      </div>
      <button className="text-lg font-bold font-serif px-3 py-1 text-hdBlack bg-hdWhite cut-corner z-1001">
        Reserve
      </button>
    </div>
  );
}

export default MobileReserveBar;
