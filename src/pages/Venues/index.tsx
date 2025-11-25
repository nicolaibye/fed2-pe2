import VenueSquareListing from "../../comp/VenueSquareListing";
import GoogleMapsSearch from "../../comp/GoogleMapsSearch";
import FilterButton from "../../comp/FilterButton";

function Venues() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      <section className="grow">
        <h2 className="text-2xl font-serif font-bold mb-2">Top Listing</h2>
        <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
          <VenueSquareListing />
        </ul>
      </section>
      <div className="flex flex-col gap-4 items-end flex-1">
        <GoogleMapsSearch />
        <FilterButton />
      </div>
    </div>
  );
}

export default Venues;
