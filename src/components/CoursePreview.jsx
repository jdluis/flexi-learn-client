import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import IsInstructor from "./IsInstructor.jsx";

function CoursePreview(props) {
  const { course, loggedInstructorId, loggedStudentId } = props;

  return (
    <div className={"w-32 h-full rounded overflow-hidden shadow-lg"}>
      <Link to={`/courses/details/${course._id}`} className={"w-full"}>
        <div className={"w-full"}>
          <div>
            <img
              className="w-full h-full object-cover rounded-xl shadow-lg"
              src={course.coverImg_url ?? course.coverImg_url}
              alt="Sunset in the mountains"
            />
            <IsInstructor>
              {loggedInstructorId === course.instructor._id && (
                <Link
                  to={`/courses/edit/${course._id}`}
                  className="btn text-green-300 relative left-28 bottom-32"
                >
                  <FiEdit className="hover:border-2 rounded-md  " />
                </Link>
              )}
            </IsInstructor>
          </div>

          <div className="pt-1 w-full">
            <h3 className="font-medium text-sm">
              {course.title.substring(0, 22)}
            </h3>
            <p className="text-gray-200 text-sm">
              {course.description.substring(0, 25)}...
            </p>
          </div>
          {/* <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <span>{course.price} $</span>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.topic}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.level}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.totalDuration} min
          </span>
        </div> */}
        </div>
      </Link>
    </div>
  );
}

export default CoursePreview;
