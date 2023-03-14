import { createContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  // nuestros estados de auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [loggedInstructorId, setIsLoggedInstructorId] = useState(null);
  const [loggedStudentId, setLoggedStudentId] = useState(null);

  // nuestras funciones de auth

  // esta funcion que va a contactar al backend, para validar el Token
  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      console.log("Token es valido");

      if (response.data.instructor) {
        setIsLoggedInstructorId(response.data.instructor);
        setIsInstructor(true);
      } else {
        setLoggedStudentId(response.data.student);
        setIsInstructor(false);
      }

      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log("Token invalido o no existe");
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  const passedContext = {
    isInstructor,
    isLoggedIn,
    loggedUser,
    loggedInstructorId,
    loggedStudentId,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isFetching === true) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" size={200} cssOverride={{}} loading />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
