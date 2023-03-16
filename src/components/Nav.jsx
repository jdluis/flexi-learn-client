import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { GiOpenBook } from "react-icons/gi";
import { BsPerson, BsPaperclip, BsSearch } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import IsStudent from "./IsStudent";
import IsInstructor from "./IsInstructor";

export default function Root() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    color: "green",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };
  
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  return (
    <nav className="bg-primary text-slate-400 font-light p-4 fixed w-full bottom-0 h-14 lg:top-0">
      <ul className="flex justify-evenly items-center">
        {isLoggedIn ? (
          <>
            <li>
              <button
                className={"flex flex-col items-center"}
                onClick={handleLogOut}
              >
                <CiLogout />
                <p className={"text-xs"}> Log Out</p>{" "}
              </button>
            </li>
            <li>
              <NavLink
                className={"flex flex-col items-center"}
                style={toggleStyles}
                end={true}
                to={`/`}
              >
                <GiOpenBook />

                <p className={"text-xs"}>
                  <IsStudent>Study</IsStudent>
                  <IsInstructor>Courses</IsInstructor>
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={"flex flex-col items-center"}
                style={toggleStyles}
                to={`/search`}
              >
                <BsSearch />
                <p className={"text-xs"}>Search</p>
              </NavLink>
            </li>
            <IsStudent>
              <li>
                <NavLink
                  className={"flex flex-col items-center"}
                  style={toggleStyles}
                  to={`/notes`}
                >
                  <BsPaperclip />
                  <p className={"text-xs"}>NoteList</p>
                </NavLink>
              </li>
            </IsStudent>
            <li>
              <NavLink
                className={"flex flex-col items-center"}
                style={toggleStyles}
                to={`/profile`}
              >
                <BsPerson />
                <p className={"text-xs"}> Profile</p>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink style={toggleStyles} to={`/`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={toggleStyles} to={`/login`}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink style={toggleStyles} to={`/signup`}>
                SignUp
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
