import { useSearchContext } from "../../context/SearchContext/useSearchContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "../DatePicker";

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

  function goToVenueSearch(event?: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    navigate("/venue");
    setIsSummary(true);
  }

  return (
    <div
      className={`${venuePage || homePage ? "flex" : "hidden"} flex-col gap-4 w-full bg-hdRed text-hdWhite p-4`}
    >
      <p onClick={openSummary}>
        {searchSummary === true ? "Searched Page" : "Waiting Page"}
      </p>
      <form className="flex flex-col gap-3">
        <h2 className="text-xl font-serif font-light text-center">
          What type of adventurer are you?
        </h2>
        <div className="flex gap-3">
          <label htmlFor="adventurerChoice1" className="radio-label">
            <input
              type="radio"
              id="adventurerChoice1"
              name="adventurer"
              value="solo"
              className="peer sr-only"
            />
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>Solo</span>
          </label>
          <label htmlFor="adventurerChoice2" className="radio-label">
            <input
              type="radio"
              id="adventurerChoice2"
              name="adventurer"
              value="family"
              className="peer sr-only"
            />
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>Family</span>
          </label>
          <label htmlFor="adventurerChoice3" className="radio-label">
            <input
              type="radio"
              id="adventurerChoice3"
              name="adventurer"
              value="corpo"
              className="peer sr-only"
            />
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>Corpo</span>
          </label>
        </div>

        <input
          type="text"
          placeholder="Where are you going?"
          className="input-field"
        />
        <div className="grid grid-cols-2 gap-3 w-full relative">
          <DatePicker />
          <input type="text" placeholder="Guests" className="input-field" />
        </div>
        <button
          type="submit"
          onClick={goToVenueSearch}
          className="text-xl font-extrabold font-serif w-full h-10 text-hdBlack bg-hdYellow"
        >
          Let's explore!
        </button>
      </form>
    </div>
  );
}

export default DestinationSection;
