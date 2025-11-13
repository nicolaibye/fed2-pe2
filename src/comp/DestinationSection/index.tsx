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
        <input type="date" className="p-2 rounded-md text-black w-full mt-2" />
        <input
          type="text"
          placeholder="Guests"
          className="p-2 rounded-md text-black w-full mt-2"
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={goToVenueSearch}>Venue search</button>
    </div>
  );
}

export default DestinationSection;
