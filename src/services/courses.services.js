//All functions who contact backend for CRUD of Courses
import service from "./config.services";

const addCoursesService = (newCourse) => {
  return service.post("/courses/add", newCourse);
};

const allCoursesService = () => {
    return service.get("/courses");
  };


const verifyService = () => {
    return service.get(`/auth/verify`);
  };


export {
    addCoursesService,
    allCoursesService,
    verifyService
};
