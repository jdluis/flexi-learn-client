import { useEffect, useContext, useState } from "react";
import IsStudent from "../components/IsStudent";
import Loading from "../components/Loading";
import UploadImg from "../components/UploadImg";
import { AuthContext } from "../context/auth.context";

import {
  editUserService,
  getInstructorService,
  getStudentService,
  getUserService,
} from "../services/user.services";

function Profile() {
  const { isInstructor, loggedUser, loggedInstructorId, loggedStudentId } =
    useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [student, setStudent] = useState(null);

  //User Model

  const [first_name, setFirstName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);

  const handleTopics = (e) => {
    if (topics.includes(e.target.value)) {
    } else {
      setTopics([...topics, e.target.value]);
    }
  };

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLast_name(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  useEffect(() => {
    getUser();
    isInstructor === true ? getInstructor() : getStudent();
  }, []);

  const getUser = async () => {
    try {
      const userData = await getUserService(loggedUser._id);
      setImageUrl(userData.data.profileImg_url);
      setFirstName(userData.data.first_name);
      setLast_name(userData.data.last_name);
      setDescription(userData.data.description);
      setEmail(userData.data.email);
      setUser(userData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getInstructor = async () => {
    try {
      const insructorData = await getInstructorService(loggedInstructorId);
      console.log(insructorData);
      setInstructor(insructorData);
    } catch (err) {
      console.log(err);
    }
  };
  const getStudent = async () => {
    try {
      const studentData = await getStudentService(loggedStudentId);
      console.log(studentData.data);
      setStudent(studentData.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*   const handleDelete = async () => {
    try {
      await 
    } catch (error) {
      console.log(error)
    }
  }; */

  const handleUpdate = async () => {
    try {
      await editUserService(user._id, {
        email,
        first_name,
        last_name,
        description,
        profileImg_url: imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return <Loading />;
  }

  return (
    <div className="mt-20 text-black flex flex-col gap-5">
      <UploadImg imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <div>
        <h3 className="text-white">Basics</h3>
        <input
          onChange={handleFirstName}
          type="text"
          value={first_name}
          placeholder="First Name"
        />
        <input
          onChange={handleLastName}
          type="text"
          value={last_name}
          placeholder="Last Name"
        />
        <input
          onChange={handleEmail}
          type="text"
          value={email}
          placeholder="Email"
        />
      </div>
      <div>
        <h3 className="text-white">About Me</h3>
        <div>
          <textarea
            value={description}
            onChange={handleDescription}
            type="text"
          ></textarea>
          <input type="text" placeholder="Language" />
        </div>
        {student && (
          <div className="mt-5">
            <h4>Topics:</h4>
            <div className="flex flex-wrap">
              <input
                className=" rounded-l text-slate-700"
                value={topics}
                onChange={handleTopics}
                placeholder={"programing, healthy, psychology, marketing"}
              />
              <p className="text-sm text-gray-500">
                Write your topics with a comma between
              </p>
            </div>
          </div>
        )}
        <div></div>
      </div>
      <div>
        <h3 className="text-white">My Courses</h3>
        <IsStudent>
          <div>
            <ul>
              {student &&
                student.purchasedCourses.map((course) => {
                  return (
                    <li>
                      {course.title}--{course.totalDuration} Minutes
                    </li>
                  );
                })}
            </ul>
          </div>
        </IsStudent>
      </div>
      <div className="text-white">
        <button onClick={handleUpdate}>Save</button>
        {/* <button onClick={handleDelete}>Delete</button> */}
      </div>
    </div>
  );
}

export default Profile;
