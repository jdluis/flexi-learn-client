import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function IsStudent(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default IsStudent;
