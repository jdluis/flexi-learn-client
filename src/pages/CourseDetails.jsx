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
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    console.log("añadido");
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="mt-20">
      <UserInfo user={courseCreator} />
      <CourseInfo course={courseData} />
      <IsStudent>
        <button
          onClick={handleAddToCart}
          className="btn p-2 bg-green-300 text-black"
        >
          Add to Cart
        </button>
      </IsStudent>

      <IsInstructor>
        {loggedInstructorId === courseData.instructor._id && (
          <Link
            to={`/courses/edit/${courseData._id}`}
            className="btn p-2 bg-green-300 text-black"
          >
            Edit
          </Link>
        )}
      </IsInstructor>
    </div>
  );
}

export default CourseDetails;
