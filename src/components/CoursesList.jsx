import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allCoursesService } from "../services/courses.services";
function CoursesList() {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState(null);

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
    return "Loading"
  }

  return (
    <div>
 {allCourses.map((course) => {
        return (
          <div key={course._id}>
            <div>
              <img src="" alt="portada" />
            </div>
            <div>
              <h3>Title {course.title}</h3>
              <p>Description {course.description}</p>
              <p>Precio <span>{course.price} $</span></p>
            </div>
          </div>
        )
      })} 
    </div>
  );
}

export default CoursesList;
