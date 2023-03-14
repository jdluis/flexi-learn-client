
import { Link } from "react-router-dom";

function CourseInfo(props) {
  const { course } = props;
  return (
    <div to={`/courses/details/${course._id}`}>
      <div className=" overflow-hidden shadow-lg">
        <div className="w-40">
          <img
            className="w-full object-cover"
            src={course.coverImg_url}
            alt="Sunset in the mountains"
          />
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{course.title}</div>
          <p className="text-gray-200 text-base">{course.description}</p>
          <p className="text-gray-200 text-base">Topic: {course.topic}</p>
          <p className="text-gray-200 text-base">Total Duration: {course.totalDuration} minutes</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <span>{course.price} $</span>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.level}
          </span>
        </div>
        <div>
          <ul>
            {course.lectures &&
              course.lectures.map((lecture, index) => {
                return (
                  <li key={lecture._id}>
                    {index}: {lecture.title}, duration: {lecture.duration}{" "}
                    minutes{" "}
                    <Link
                      className="bg-green-300 text-black rounded-lg  p-1"
                      to={`/courses/lecture/${lecture._id}`}
                    >
                      Watch
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
