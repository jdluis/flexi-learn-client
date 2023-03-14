//All functions who contact backend for CRUD of Courses
import service from "./config.services";

const addCoursesService = (newCourse) => {
  return service.post("/courses/add", newCourse);
};

const editCoursesService = (id, newCourse) => {
  return service.patch(`/courses/${id}/edit`, newCourse);
};

const allCoursesService = () => {
  return service.get('/courses');
};

const oneCoursesService = (_id) => {
  return service.get(`/courses/${_id}`);
};

const deleteCoursesService = (_id) => {
  return service.delete(`/courses/${_id}/delete`);
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
  oneCoursesService,
  deleteCoursesService,
  verifyService,
};
