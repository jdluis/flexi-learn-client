import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allCoursesService } from "../services/courses.services";
import SearchCourses from "./SearchCourses";

function CoursesList() {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState(null);
  const [topic, setAlltopic] = useState("");
  const [strToSearch, setAllStrToSearch] = useState("");

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const resolve = await allCoursesService();
      console.log(resolve.data.data);
      setAllCourses(resolve.data.data);
    } catch (err) {
      navigate("/");
    }
  };

  if (allCourses === null) {
    return "Loading";
  }

  return (
    <div className="flex flex-col gap-10">
      <SearchCourses
        setAllStrToSearch={setAllStrToSearch}
        setAlltopic={setAlltopic}
        topic={topic}
        strToSearch={strToSearch}
      />

      <div className="flex justify-evenly flex-wrap">
        {allCourses
          .filter((course) =>
            course.title.toLowerCase().includes(strToSearch.toLowerCase())
          )
          .filter((course) => topic === "" || course.topic === topic)
          .map((course) => (
            <div
              key={course._id}
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
                  #winter
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CoursesList;
