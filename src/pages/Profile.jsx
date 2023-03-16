import { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import IsStudent from "../components/IsStudent";
import Loading from "../components/Loading";
import UploadImg from "../components/UploadImg";
import { AuthContext } from "../context/auth.context";
import moment from "moment";
import {
  editUserService,
  getInstructorService,
  getStudentService,
  getUserService,
} from "../services/user.services";
import { Link } from "react-router-dom";

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
  const [language, setLanguage] = useState("");
  const [topics, setTopics] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleTopics = (e) => {
    if (topics.includes(e.target.value)) {
    } else {
      setTopics([...topics, e.target.value]);
    }
  };
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
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
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  const getInstructor = async () => {
    try {
      const insructorData = await getInstructorService(loggedInstructorId);
      console.log(insructorData);
      setInstructor(insructorData);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };
  const getStudent = async () => {
    try {
      const studentData = await getStudentService(loggedStudentId);
      console.log(studentData.data);
      setStudent(studentData.data);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  /*   const handleDelete = async () => {
    try {
      await 
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  }; */

  const handleUpdate = async () => {
    handleIsEditing();
    try {
      await editUserService(user._id, {
        email,
        first_name,
        last_name,
        description,
        profileImg_url: imageUrl,
      });
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  if (user === null) {
    return <Loading />;
  }

  return (
    <div className="mt-20 text-black flex flex-col gap-5  text-center justify-center w-full items-center">
      <UploadImg
        isEditing={isEditing}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <div>
        <h2 className="font-bold text-slate-100">
          {first_name} {last_name}
        </h2>
        <p className="text-slate-300">
          Since: {moment(user.createdAt).format("DD MMM YYYY")}
        </p>
      </div>
      <div>
        <h3 className="text-white">Basics</h3>
        {!isEditing && (
          <>
            <p className="text-slate-300">{email}</p>
            <p className="text-slate-300">Languages: {language ?? language}</p>
          </>
        )}
        {isEditing && (
          <>
            <input
              className=" appearance-none"
              onChange={handleFirstName}
              type="text"
              value={first_name}
              placeholder="First Name"
            />
            <input
              className=" appearance-none"
              onChange={handleLastName}
              type="text"
              value={last_name}
              placeholder="Last Name"
            />
            <input
              className=" appearance-none"
              onChange={handleEmail}
              type="text"
              value={email}
              placeholder="Email"
            />{" "}
          </>
        )}
      </div>
      <div>
        <h3 className="text-white">About Me</h3>
        {!isEditing && <p className="text-slate-300">{description}</p>}
        {isEditing && (
          <>
            <div>
              <textarea
                className=" appearance-none"
                value={description}
                onChange={handleDescription}
                type="text"
              ></textarea>
              <input
                value={language}
                onChange={handleLanguage}
                type="text"
                placeholder="Language"
              />
            </div>
            {student && (
              <div className="mt-5">
                <h4 className="text-white">Topics:</h4>
                <div className="flex flex-col w-3/4 m-auto flex-wrap">
                  <input
                    className="appearance-none rounded-l text-slate-700"
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
          </>
        )}
      </div>
      {!isEditing && (
        <div>
          <h3 className="text-white">My Courses</h3>
          <IsStudent>
            <div>
              {student && student.purchasedCourses.length === 0 && (
                <p className="text-red-600">You dont have courses yet</p>
              )}
              <div>
                {student &&
                  student.purchasedCourses.map((course) => {
                    return (
                      <Link to={`/courses/details/${course._id}`} className="text-slate-300">
                        {course.title} | {course.totalDuration} Minutes
                      </Link>
                    );
                  })}
              </div>
            </div>
          </IsStudent>
        </div>
      )}
      <div className="text-white">
        {isEditing && (
          <button className="btn-ok" onClick={handleUpdate}>
            Save
          </button>
        )}
        {!isEditing && (
          <button className="btn-ok" onClick={handleIsEditing}>
            Edit
          </button>
        )}

        {/* <button onClick={handleDelete}>Delete</button> */}
      </div>
    </div>
  );
}

export default Profile;
