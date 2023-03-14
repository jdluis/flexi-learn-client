import { Link } from "react-router-dom";

function CoursePreview(props) {
  const { course, loggedInstructorId } = props;

  return (
    <div>
      <Link
        to={`/courses/details/${course._id}`}
        className="max-w-sm rounded overflow-hidden shadow-lg"
      >
        <div>
          <img className="w-full" src="" alt="Sunset in the mountains" />
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{course.title}</div>
          <p className="text-gray-200 text-base">{course.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <span>{course.price} $</span>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.topic}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.level}
          </span>
        </div>
      </Link>
      {loggedInstructorId === course.instructor._id && (
        <Link
          to={`/courses/edit/${course._id}`}
          className="btn p-2 bg-green-300 text-black"
        >
          Edit
        </Link>
      )}
    </div>
  );
}

export default CoursePreview;
