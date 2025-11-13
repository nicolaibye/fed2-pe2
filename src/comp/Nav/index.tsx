import { Link } from "react-router";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <div>
              <img src="" alt="" />
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/venue">
            <div>
              <img src="" alt="" />
              <p>Search</p>
            </div>
          </Link>
        </li>
        <li>
          <div>
            <img src="" alt="" />
            <p>Trips</p>
          </div>
        </li>
        <li>
          <div>
            <img src="" alt="" />
            <p>Chat</p>
          </div>
        </li>
        <li>
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
