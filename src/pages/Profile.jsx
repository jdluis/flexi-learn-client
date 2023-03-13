import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
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
  const [profileImg_url, setProfileImg_url] =  useState()
  const [firstName, setFirstName] =  useState()
  const [last_name, setLast_name] =  useState()
  const [description, setDescription] =  useState()
  const [email, setEmail] =  useState()

  const handleImgUrl = (e) => setProfileImg_url(e.target.value)
  const handleFirstName = (e) => setFirstName(e.target.value)
  const handleLastName = (e) => setLast_name(e.target.value)
  const handleDescription = (e) => setDescription(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)

  useEffect(() => {
    getUser();
    isInstructor === true ? getInstructor() : getStudent();
  }, []);

  const getUser = async () => {
    try {
      const userData = await getUserService(loggedUser._id);
      setProfileImg_url(userData.data.profileImg_url)
      setFirstName(userData.data.firstName)
      setLast_name(userData.data.last_name)
      setDescription(userData.data.description)
      setEmail(userData.data.email)
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
      console.log(studentData);
      setStudent(studentData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {

  }

  const handleUpdate = () => {
    
  }


  if (user === null) {
    return "Loading";
  }

  return (
    <div className="mt-20 text-black">
      <div>
        <img src={user.profileImg_url} alt="profile photo" />
        <input onChange={handleImgUrl} value={profileImg_url} type="text" placeholder="Change imgUrl" />
      </div>
      <div >
        <h3 className="text-white">Basics</h3>
        <input onChange={handleFirstName} type="text" value={firstName} placeholder="First Name" />
        <input onChange={handleLastName} type="text" value={last_name} placeholder="Last Name" />
        <input onChange={handleEmail} type="text" value={email} placeholder="Email" />
      </div>
      <div>
        <h3 className="text-white">About Me</h3>
        <div>
          <textarea onChange={handleDescription} type="text">
          {description}
          </textarea>
          <input type="text" placeholder="Language"/>
        </div>
      </div>
      <div>
        <h3 className="text-white">My Courses</h3>
        <div>
          <h2>---</h2>
        </div>
      </div>
      <div className="text-white">
        <button onClick={handleUpdate}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Profile;
