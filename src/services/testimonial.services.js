//All functions who contact backend for CRUD of Courses
import service from "./config.services";

const allTestimonialService = () => {
  return service.get(`/testimonial`);
};

const authorTestimonialsService = (idUser) => {
  return service.get(`/testimonial/${idUser}`);
};

const addTestimonialService = (newData) => {
  return service.post("/testimonial/add", newData);
};

const deleteTestimonialService = (_id) => {
  return service.delete(`/testimonial/${_id}/delete`);
};

export {
  allTestimonialService,
  addTestimonialService,
  deleteTestimonialService,
  authorTestimonialsService,
};
