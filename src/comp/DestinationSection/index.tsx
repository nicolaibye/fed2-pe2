import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { useNavigate } from "react-router-dom";

function DestinationSection() {
  const { isSummary: searchSummary } = useSearchContext();
  const { setIsSummary } = useSearchContext();
  const navigate = useNavigate();

  const venuePage = window.location.pathname === "/venue";
  const homePage =
    window.location.pathname === "/" || window.location.pathname === "";

  function openSummary() {
    setIsSummary(false);
  }

  function goToVenueSearch() {
    navigate("/venue");
    setIsSummary(true);
  }

  return (
    <div
      className={`${venuePage || homePage ? "flex" : "hidden"} flex-col gap-4 w-full bg-red-950 text-white p-4`}
    >
      <p onClick={openSummary}>
        {searchSummary === true ? "Searched Page" : "Waiting Page"}
      </p>
      <button onClick={goToVenueSearch}>Venue search</button>
    </div>
  );
}

export default DestinationSection;
