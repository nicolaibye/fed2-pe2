import { Link } from "react-router";
import VenueSquareListing from "../../comp/VenueSquareListing";

function Venues() {
  return (
    <div className="flex flex-col gap-4">
      Venues Page
      <Link to="/venue/1">Go to Venue 1</Link>
      <Link to="/venue/2">Go to Venue 2</Link>
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <VenueSquareListing />
      </ul>
    </div>
  );
}

export default Venues;
