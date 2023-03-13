//All functions who contact backend for CRUD of Lectures
import service from "./config.services";

const getUserService = (id) => {
  return service.get(`/user/${id}`);
};

const getInstructorService = (id) => {
  return service.get(`/user/instructor/${id}`);
};

const getStudentService = (id) => {
  return service.get(`/user/student/${id}`);
};

export { getUserService, getInstructorService, getStudentService };
