import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { Menu } from "./Menu";
import { UserContext } from "../context/UserContext";

export const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  //console.log(prompt);
  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between  px-6 md:px-[200] py-4 bg-lime-500 pb-6  ">
      <div className="flex gap-4">
        <Link to="/">
          <img
            className="min-w-10"
            src="https://res.cloudinary.com/dewwjsltu/image/upload/v1712547527/4228184_24888_djx0im.svg"
            alt=""
            width="50px"
          />
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-white ">
          <Link to="/">7W</Link>
        </h1>
      </div>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-4">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <IoMdSearch className="text-white  " />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none w-full px-4 py-2 rounded-xl "
            placeholder="Search a Post"
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 text-white">
        {user ? (
          <h3>
            <Link to="/create">Create</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
              {menu && <Menu />}
            </p>
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>{" "}
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden textlg">
        <p className="cursor-pointer relative">
          <FaBars />
          {menu && <Menu />}
        </p>
      </div>
    </div>
  );
};
