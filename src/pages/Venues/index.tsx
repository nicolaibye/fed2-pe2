import VenueSquareListing from "../../comp/VenueSquareListing";
import GoogleMapsSearch from "../../comp/GoogleMapsSearch";
import FilterButton from "../../comp/FilterButton";
import VenueLandscapeListing from "../../comp/VenueLandscapeListing";

function Venues() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10 w-full">
      <section className="flex flex-col gap-7 overflow-x-scroll">
        <div>
          <input
            id="input"
            className="w-full"
            type="search"
            autocomplete="off"
            spellcheck="false"
            role="combobox"
            aria-controls="matches"
            aria-live="polite"
            aria-expanded="false"
            aria-description=""
            placeholder="Search Google or type a URL"
          ></input>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold mb-2">Top Venues</h2>
          <ul className="flex flex-row gap-2 overflow-x-scroll rounded-xs">
            <VenueLandscapeListing />
            <VenueLandscapeListing />
            <VenueLandscapeListing />
            <VenueLandscapeListing />
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold mb-2">All Listings</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-xs">
            <VenueSquareListing />
          </ul>
        </div>
      </section>
      <div className="flex flex-col gap-4 items-end flex-1">
        <GoogleMapsSearch />
        <FilterButton />
      </div>
    </div>
  );
}

export default Venues;
