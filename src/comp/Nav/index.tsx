import { Link } from "react-router";

function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-hdRed h-14 text-center font-medium">
      <ul className="flex p-2 text-xs">
        <li className="flex-1">
          <Link to="/">
            <div>
              <img src="" alt="" />
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link to="/venue">
            <div>
              <img src="" alt="" />
              <p>Search</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <div>
            <img src="" alt="" />
            <p>Trips</p>
          </div>
        </li>
        <li className="flex-1">
          <div>
            <img src="" alt="" />
            <p>Chat</p>
          </div>
        </li>
        <li className="flex-1">
          <Link to="/account">
            <div>
              <img src="" alt="" />
              <p>Account</p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
