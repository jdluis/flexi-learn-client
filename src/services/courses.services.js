//All functions who contact backend for CRUD of Courses
import service from "./config.services";

const addCoursesService = (newCourse) => {
  return service.post("/courses/add", newCourse);
};

const editCoursesService = (newCourse, id) => {
  return service.post("/courses/:id/edit", newCourse);
};

const allCoursesService = () => {
  return service.get("/courses");
};

//No se si tengo que pasarle el token de alguna forma, o ya lo detecta
//En postman funciona con el token correspondiente al del usuario logeado
const allMyCoursesService = () => {
  return service.get("/courses/my-courses");
};

const verifyService = () => {
  return service.get(`/auth/verify`);
};

export {
  addCoursesService,
  allCoursesService,
  allMyCoursesService,
  editCoursesService,
  verifyService,
};
