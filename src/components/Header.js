import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus=useOnlineStatus();
  return (
    <div className="flex justify-between shadow-lg bg-red-100">
      <div className="logo-container">
        <img className="w-28" src={LOGO_URL}></img>
      </div>
      <div className="flex">
        <ul className="flex p-4 m-4">
        <li className="px-5">
            Online Status:{onlineStatus?"✅":"🔴"}
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About US</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-5">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-5">Cart</li>
          <button
            className="border border-solid border-black px-3 py-1"
            onClick={() => {
              btnNameReact == "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
