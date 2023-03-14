import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCoursesService,
  oneCoursesService,
  deleteCoursesService,
} from "../../services/courses.services";
import AddLectures from "./AddLectures";
import { deleteLectureService } from "../../services/lectures.services";
import Modal from "react-modal";
import UploadImg from "../../components/UploadImg";

function EditCourse() {
  //Define parent root of Modal, for screen readers
  Modal.setAppElement("#root");
  //Other Variables
  const navigate = useNavigate();
  const { id } = useParams();

  //Locals States
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [courseForEdit, setCourseForEdit] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const hanleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const hanleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const hanlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  //The result of the sum of each lecture
  const handleTotalDurationChange = () => {
    lectures.forEach((lecture) => {
      setTotalDuration(Number(totalDuration) + Number(lecture.duration));
    });
  };

  useEffect(() => {
    getCourse();
    handleTotalDurationChange();
  }, [lectures.length, isDeleted, isFetching]);

  const getCourse = async () => {
    try {
      const course = await oneCoursesService(id);
      setCourseForEdit(course.data);

      const {
        title,
        topic,
        level,
        price,
        description,
        lectures,
        coverImg_url,
      } = course.data;
      setTitle(title);
      setTopic(topic);
      setLevel(level);
      setDescription(description);
      setPrice(price);
      setLectures(lectures);
      setImageUrl(coverImg_url)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteLecture = async (idLecture) => {
    setIsDeleted(false);
    try {
      await deleteLectureService(idLecture);

      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title,
        topic,
        level,
        description,
        price,
        totalDuration,
        coverImg_url: imageUrl,
      };
      await editCoursesService(id, updatedData);

      navigate(`/`);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCoursesService(id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-20">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                Update {courseForEdit.title}
              </h1>
              <p>Change the info of course course</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Topic</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <select
                      value={courseForEdit.topic}
                      onChange={handleTopicChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    >
                      <option disabled value="">
                        Select One
                      </option>
                      <option value="programing">Programing</option>
                      <option value="healthy">Healthy</option>
                      <option value="psychology">Psychology</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Level</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <select
                      value={courseForEdit.level}
                      onChange={handleLevelChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    >
                      <option disabled value="">
                        Select One
                      </option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Title</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      value={title}
                      onChange={hanleTitleChange}
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Title"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
              <UploadImg imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label className="text-xs font-semibold px-1">
                    Description
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      value={description}
                      onChange={hanleDescriptionChange}
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label className="text-xs font-semibold px-1">Price</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                      value={price}
                      onChange={hanlePriceChange}
                      type="number"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="border-b-2 text-xl font-bold">
                  Lectures{" "}
                  <button
                    className=" text-green-500 hover:scale-150  rounded-full text-xl font-bold"
                    onClick={handleOpenModal}
                  >
                    +
                  </button>
                </h2>

                {lectures.length === 0 ? (
                  "No lectures created yet"
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>title</th>
                        <th>duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lectures.map((lecture) => {
                        return (
                          <tr key={lecture.video_url}>
                            <th>
                              <button
                                onClick={() => handleDeleteLecture(lecture._id)}
                              >
                                del
                              </button>
                            </th>
                            <td>{lecture.title}</td>
                            <td>{lecture.duration}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              <Modal isOpen={showModal}>
                <AddLectures
                  setLectures={setLectures}
                  handleCloseModal={handleCloseModal}
                  setIsFetching={setIsFetching}
                />
              </Modal>

              <div className="flex mt-5 mx-3">
                <div className="w-full px-3 mb-5 flex gap-3">
                  <button
                    onClick={handleUpdateCourse}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
