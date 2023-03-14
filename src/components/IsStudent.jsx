import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsStudent(props) {
  const { isLoggedIn, isInstructor } = useContext(AuthContext);

  if (!isInstructor && isLoggedIn) {
    return props.children;
  }
}

export default IsStudent;
