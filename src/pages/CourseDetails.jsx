import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { oneCoursesService } from "../services/courses.services";
import { getInstructorService } from "../services/user.services";
import IsStudent from "../components/IsStudent";
import UserInfo from "../components/UserInfo";
import CourseInfo from "../components/CourseInfo";
import Loading from "../components/Loading";
import IsInstructor from "../components/IsInstructor";
import { toast } from "react-toastify";
import { addToCartService } from "../services/student.services";

function CourseDetails() {
  const { courseId } = useParams();

  //Global Context
  const { loggedInstructorId, loggedStudentId, loggedUser } =
    useContext(AuthContext);

  const [courseData, setCourseData] = useState();
  const [instructorData, setInstructorData] = useState();
  const [courseCreator, setCourseCreator] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);

    try {
      const response = await oneCoursesService(courseId);
      const responseInstructor = await getInstructorService(
        response.data.instructor._id
      );
      setInstructorData(responseInstructor.data);
      setCourseCreator(responseInstructor.data.user_id);
      setCourseData(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCartService(loggedStudentId, courseId)
      toast.success("Course add to cart");
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <div
        className="bg-opacity-50 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${courseData.coverImg_url})` }}
      >
        <UserInfo user={courseCreator} />
      </div>
      <CourseInfo handleAddToCart={handleAddToCart} course={courseData} />

      <IsInstructor>
        {loggedInstructorId === courseData.instructor._id && (
          <Link
            to={`/courses/edit/${courseData._id}`}
            className="btn p-2 bg-green-300 text-black absolute bottom-20 left-10"
          >
            Edit
          </Link>
        )}
      </IsInstructor>
    </div>
  );
}

export default CourseDetails;
