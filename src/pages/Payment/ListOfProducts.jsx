import { getMyProductsService } from "../../services/student.services.js";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";
import CoursePreview from "../../components/CoursePreview.jsx";
import Loading from "../../components/Loading.jsx";

function ListOfProducts() {
  const { loggedInstructorId, loggedStudentId, loggedUser } =
    useContext(AuthContext);

  const [productsList, setProductsList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      setIsFetching(true);
      const response = await getMyProductsService(loggedUser._id);
      setProductsList(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.errorMessage);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  const hasPurchasedCourses = productsList?.purchasedCourses?.length > 0;

  return (
    <div>
      <h3>My Courses</h3>

      <div className="flex justify-center items-top gap-y-10 gap-x-3 flex-wrap">
        {hasPurchasedCourses ? (
          productsList.purchasedCourses.map((course) => (
            <CoursePreview key={course._id} course={course} />
          ))
        ) : (
          <p>You don't have any courses yet</p>
        )}
      </div>
    </div>
  );
}

export default ListOfProducts;
