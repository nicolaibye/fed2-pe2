import {
  ChatCenteredIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { NavLink } from "react-router";
// import { ReactComponent as LogoIcon } from "icons/logo_icon_black.svg";

function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 md:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] md:w-84 md:aboslute md:top-4 md:bottom-auto md:left-auto md:right-4  w-full text-hdWhite md:rounded-full h-auto text-center font-medium z-1000">
      <ul className="flex text-xs">
        <li className={`flex-1`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-hdYellow md:text-hdBlack" : ""} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex flex-col p-2 md:p-3 items-center gap-0.5 ${isActive ? "md:bg-hdYellow bg-hdRed" : "bg-hdRed"} w-full md:rounded-l-full transition-colors duration-300`}
              >
                <HouseIcon size={24} className="md:hidden" />
                <p>Home</p>
              </div>
            )}
          </NavLink>
        </li>
        <div className="bg-hdRedAccent h-auto w-px"></div>
        <li className="flex-1">
          <NavLink
            to="/venue"
            className={({ isActive }) =>
              `${isActive ? "text-hdYellow md:text-hdBlack" : ""} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex flex-col p-2 md:p-3 items-center gap-0.5 ${isActive ? "md:bg-hdYellow bg-hdRed" : "bg-hdRed"} w-full transition-colors duration-300`}
              >
                <MagnifyingGlassIcon size={24} className="md:hidden" />
                <p>Search</p>
              </div>
            )}
          </NavLink>
        </li>
        <div className="bg-hdRedAccent h-auto w-px"></div>
        <li className="flex-1 p-2 md:p-3 bg-hdRed">
          <div className="flex flex-col items-center gap-0.5">
            <HouseIcon size={24} className="md:hidden" />
            {/* <LogoIcon className="" /> */}
            <p>Trips</p>
          </div>
        </li>
        <div className="bg-hdRedAccent h-auto w-px"></div>
        <li className="flex-1 p-2 md:p-3 bg-hdRed">
          <div className="flex flex-col items-center gap-0.5">
            <ChatCenteredIcon size={24} className="md:hidden" />
            <p>Chat</p>
          </div>
        </li>
        <div className="bg-hdRedAccent h-auto w-px"></div>
        <li className="flex-1">
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `${isActive ? "text-hdYellow md:text-hdBlack" : ""} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex flex-col p-2 md:p-3 items-center gap-0.5 ${isActive ? "md:bg-hdYellow bg-hdRed" : "bg-hdRed"} w-full md:rounded-r-full transition-colors duration-300`}
              >
                <UserIcon size={24} className="md:hidden" />
                <p>Account</p>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
