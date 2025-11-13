import { Link } from "react-router";

function Venues() {
  return (
    <div className="flex flex-col gap-4">
      Venues Page
      <Link to="/venue/1">Go to Venue 1</Link>
      <Link to="/venue/2">Go to Venue 2</Link>
    </div>
  );
}

export default Venues;
