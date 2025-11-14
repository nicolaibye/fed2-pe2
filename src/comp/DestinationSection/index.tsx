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
      <form>
        <h2>What type of adventurer are you?</h2>
        <div>
          <input
            type="radio"
            id="adventurerChoice1"
            name="adventurer"
            value="solo"
          />
          <label htmlFor="adventurerChoice1">Solo</label>

          <input
            type="radio"
            id="adventurerChoice2"
            name="adventurer"
            value="family"
          />
          <label htmlFor="adventurerChoice2">Family</label>

          <input
            type="radio"
            id="adventurerChoice3"
            name="adventurer"
            value="corpo"
          />
          <label htmlFor="adventurerChoice3">Corpo</label>
        </div>

        <input
          type="text"
          placeholder="Where are you going?"
          className="p-2 rounded-md text-black w-full"
        />
        <div className="flex flex-row gap-2 mt-2">
          <input
            type="date"
            className="datepicker p-2 rounded-md text-black mt-2"
          />
          <input
            type="text"
            placeholder="Guests"
            className="p-2 rounded-md text-hdBlack bg-hdWhite mt-2 h-10"
          />
        </div>
        <button
          onClick={goToVenueSearch}
          className="text-lg font-bold w-full h-10 text-hdBlack bg-hdYellow"
        >
          Let's explore!
        </button>
      </form>
    </div>
  );
}

export default DestinationSection;
