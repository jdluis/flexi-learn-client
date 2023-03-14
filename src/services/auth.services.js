//All functions who contact backend for CRUD of Todos
import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (userCredencial) => {
  return service.post('/auth/login', userCredencial);
};

const verifyService = () => {
    return service.get(`/auth/verify`);
  };


export {
    signupService,
    loginService,
    verifyService
};
