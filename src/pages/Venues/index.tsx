import VenueSquareListing from "../../comp/VenueSquareListing";
import GoogleMapsSearch from "../../comp/GoogleMapsSearch";

function Venues() {
  return (
    <div className="flex flex-col gap-4">
      <GoogleMapsSearch />
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <VenueSquareListing />
      </ul>
    </div>
  );
}

export default Venues;
