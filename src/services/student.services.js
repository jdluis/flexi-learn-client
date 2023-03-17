import service from "./config.services";

const getCartProductsService = (studentId) => {
  return service.get(`/student/cart/${studentId}`);
};

const getMyProductsService = (studentId) => {
  return service.get(`/student/my-courses/${studentId}`);
};

const addToCartService = (studentId, productId) => {
  return service.patch("/student/cart/add", {studentId, productId});
};

const addProductsToMyCourses = (studentId, productId) => {
  return service.patch("/student/my-courses/add", {studentId, productId});
};

const removeProductFromCartServices = ( studentId, productId) => {
    return service.patch("/student/cart/remove", {studentId, productId});
  };

export {
  getCartProductsService,
  getMyProductsService,
  addToCartService,
  addProductsToMyCourses,
  removeProductFromCartServices
};
