//All functions who contact backend for CRUD of Lectures
import service from "./config.services";

const allLecturesService = () => {
  return service.get("/lectures");
};

const oneLectureService = (id) => {
  return service.get(`/lectures/${id}`);
};

const addLecturesService = (newCourse, idCourse) => {
  return service.post(`/courses/${idCourse}/lectures/add`, newCourse);
};

const editLecturesService = (newCourse, id) => {
  return service.post(`/lectures/${id}/edit`, newCourse);
};

const deleteLectureService = (id) => {
  return service.delete(`/lectures/${id}/delete`);
};

//No se si tengo que pasarle el token de alguna forma, o ya lo detecta
//En postman funciona con el token correspondiente al del usuario logeado
const allMyLecturesService = (courseId) => {
  return service.get(`/courses/${courseId}/lectures`);
};

export {
  oneLectureService,
  addLecturesService,
  allLecturesService,
  allMyLecturesService,
  editLecturesService,
  deleteLectureService,
};
