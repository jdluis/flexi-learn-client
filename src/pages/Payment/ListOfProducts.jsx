import { getMyProductsService } from "../../services/student.services.js";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";
import CoursePreview from "../../components/CoursePreview.jsx";
import Loading from "../../components/Loading.jsx";

function ListOfProducts() {
  //Global Context
  const { loggedInstructorId, loggedStudentId, loggedUser } =
    useContext(AuthContext);

  const [productsList, setProductsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getMyProducts();
  }, []);

  const getMyProducts = async () => {
    try {
      setIsFetching(true);
      const response = await getMyProductsService(loggedUser._id);
      console.log(response.data);
      setProductsList(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  if (isFetching === true) {
    return <Loading />;
  }

  return (
    <div>
      <h3>My Courses</h3>
      <div className="flex justify-center items-top gap-y-10 gap-x-3 flex-wrap">
        {productsList.purchasedCourses.length === 0
          ? "You dont have any courses yet"
          : productsList.purchasedCourses.map((course) => {
              return <CoursePreview key={course._id} course={course} />;
            })}
      </div>
    </div>
  );
}

export default ListOfProducts;
