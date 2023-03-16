import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCoursesService } from "../../services/courses.services";
import AddLectures from "../../Models/AddLectures";

import Modal from "react-modal";
import { addLecturesService } from "../../services/lectures.services";
import { useHandleFileUpload } from "../../Hooks/useHandleFileUpload";
import UploadImg from "../../components/UploadImg";
import { toast } from "react-toastify";

//Define parent root of Modal, for screen readers
Modal.setAppElement("#root");

function AddCourse() {
  //Other Variables
  const navigate = useNavigate();

  //Locals States
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const hanleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  const hanleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const hanlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  /* const hanleLecturesChange = (e) => {
    setLectures(e.target.value);
  }; */
  const handleCoverImgChange = (e) => {
    setCoverImg_url(e.target.value);
  };

  //The result of the sum of each lecture
  const handleTotalDurationChange = () => {
    lectures.forEach((lecture) => {
      setTotalDuration(Number(totalDuration) + Number(lecture.duration));
    });
  };

  useEffect(() => {
    handleTotalDurationChange();
  }, [lectures.length]);

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const newCourseData = {
        title,
        topic,
        level,
        description,
        price,
        totalDuration,
        coverImg_url: imageUrl,
      };
      const newCourse = await addCoursesService(newCourseData);

      lectures.forEach(async (lecture) => {
        await addLecturesService(lecture, newCourse.data._id);
      });

      navigate("/");

      toast.info(
        `The course '${newCourse.data.title}', has been created:  👨‍🏫`,
        { position: toast.POSITION.BOTTOM_CENTER }
      );
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`${error.response.data.messageDeveloper},  👨‍🏫`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
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

  const handleClose = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleDeleteLecture = (video_url) => {
    setLectures(
      lectures.filter((lecture) => {
        return lecture.video_url !== video_url;
      })
    );
  };

  return (
    <div className="mt-20">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Add Course</h1>
              <p>Add a new course in your carrear</p>
            </div>
            <form onSubmit={handleAddCourse}>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Topic</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                    </div>
                    <select
                      defaultValue={""}
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
                      defaultValue={""}
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
                                onClick={() =>
                                  handleDeleteLecture(lecture.video_url)
                                }
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
                />
              </Modal>

              <div className="flex mt-5 mx-3">
                <div className="w-full px-3 mb-5 flex gap-3">
                  <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold">
                    Add
                  </button>
                  <button
                    onClick={handleClose}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
