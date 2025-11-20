import VenueSquareListing from "../../comp/VenueSquareListing";
import GoogleMapsSearch from "../../comp/GoogleMapsSearch";
import FilterButton from "../../comp/FilterButton";

function Venues() {
  return (
    <div className="flex flex-row gap-4">
      <section className="w-full">
        <h2 className="text-2xl font-serif font-bold mb-2">Top Listing</h2>
        <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
          <VenueSquareListing />
        </ul>
      </section>
      <div className="flex flex-col gap-4 items-end w-full">
        <GoogleMapsSearch />
        <FilterButton />
      </div>
    </div>
  );
}

export default Venues;
