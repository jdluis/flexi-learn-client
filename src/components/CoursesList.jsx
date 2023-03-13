import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  allCoursesService,
  allMyCoursesService,
} from "../services/courses.services";
import SearchCourses from "./SearchCourses";
import { AuthContext } from "../context/auth.context";

function CoursesList() {
  const navigate = useNavigate();

  //Global Context
  const { isInstructor, isLoggedIn, loggedInstructorId } =
    useContext(AuthContext);

  //Local States
  //Data
  const [allCourses, setAllCourses] = useState(null);
  const [allMyCourses, setAllMyCourses] = useState(null);
  const [renderCourses, setRenderCourses] = useState([]);

  const [isMyCourses, setIsMyCourses] = useState(false);

  //Inputs Data/Boolean
  const [topic, setAlltopic] = useState("");
  const [strToSearch, setAllStrToSearch] = useState("");

  //Is this instructor
  //Tengo que decirle a todos mis courses.instructor que sean igual
  // alinstructor id logeado que puedan editar.

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const allCoursesData = await allCoursesService();
      if (isLoggedIn) {
        const myCoursesData = await allMyCoursesService();
        setAllMyCourses(myCoursesData.data);
      }
      setAllCourses(allCoursesData.data);
      setRenderCourses(allCoursesData.data);
      console.log(renderCourses);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  //Select allData or the data of the current logged user
  const checkIsMyCourses = () => {
    //Handle My Course Button
    if (isMyCourses && allMyCourses !== null) {
      setRenderCourses(allMyCourses);
    } else {
      setRenderCourses(allCourses);
    }
    console.log(renderCourses);
  };

  //Guard Clause
  if (allCourses === null) {
    return "Loading";
  }
  return (
    <div className="flex flex-col gap-10 mb-5">
      <SearchCourses
        checkIsMyCourses={checkIsMyCourses}
        setAllStrToSearch={setAllStrToSearch}
        setAlltopic={setAlltopic}
        topic={topic}
        strToSearch={strToSearch}
        isMyCourses={isMyCourses}
        setIsMyCourses={setIsMyCourses}
      />

      <div className="flex justify-evenly flex-wrap">
        {renderCourses.length === 0
          ? "No hay datos"
          : renderCourses
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
                    <img
                      className="w-full"
                      src=""
                      alt="Sunset in the mountains"
                    />
                  </div>

                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{course.title}</div>
                    <p className="text-gray-200 text-base">
                      {course.description}
                    </p>
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
                  {loggedInstructorId === course.instructor._id && (
                    <Link
                      to={`/courses/edit/${course._id}`}
                      className="btn p-2 bg-green-300 text-black"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              ))}
      </div>
      {isInstructor && (
        <Link
          className="w-1/2 px-4 py-2 rounded-md  bg-green-300 hover:opacity-70 text-black text-center mx-auto"
          to={"/courses/add"}
        >
          Add Course
        </Link>
      )}
    </div>
  );
}

export default CoursesList;
