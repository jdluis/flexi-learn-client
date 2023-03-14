import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function IsStudent(props) {
  const { isLoggedIn, isInstructor } = useContext(AuthContext);

  if (!isInstructor && isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default IsStudent;
