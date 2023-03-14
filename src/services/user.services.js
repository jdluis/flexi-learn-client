//All functions who contact backend for CRUD of Lectures
import service from "./config.services";

//USER
const getUserService = (id) => {
  return service.get(`/user/${id}`);
};

const editUserService = (id, data) => {
  return service.patch(`/user/${id}/edit`, data);
};

/* const deleteUserService = (id) => {
  return service.delete(`/user/${id}`);
}; */


//Instructor
const getInstructorService = (id) => {
  return service.get(`/user/instructor/${id}`);
};

const editInstructorService = (id, data) => {
  return service.patch(`/user/instructor/${id}/edit`, data);
};

//Student
const getStudentService = (id) => {
  return service.get(`/user/student/${id}`);
};

const editStudentService = (id, data) => {
  return service.patch(`/user/student/${id}/edit`, data);
};

export {
  getUserService,
  getInstructorService,
  getStudentService,
  editUserService,
  editInstructorService,
  editStudentService,
  /* deleteUserService */
};
