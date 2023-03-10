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
  if (isLoggedIn === true) {
    return (
      <div>
        <ul>
          <li>
            <NavLink to={`/`}>Home</NavLink>
          </li>
        </ul>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    );
  } else {
    return (
      <>
        <nav>
          <ul>
            <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`/login`}>Login</NavLink>
            </li>
            <li>
              <NavLink to={`/signup`}>SignUp</NavLink>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
