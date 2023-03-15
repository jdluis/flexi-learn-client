import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
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
    <nav className="bg-slate-400 p-4 fixed w-full top-0">
      <ul className="flex justify-evenly items-center">
        {isLoggedIn ? (
          <>
            <li>
              <NavLink end={true} style={toggleStyles} to={`/`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={toggleStyles} to={`/profile`}>
                Profile
              </NavLink>
            </li>
            <button onClick={handleLogOut}>Log Out</button>
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
