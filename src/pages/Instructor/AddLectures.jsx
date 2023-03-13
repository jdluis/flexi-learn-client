import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addLecturesService } from "../../services/lectures.services";

function AddLectures(props) {
  const currentPath = useLocation();
  const { id } = useParams();

  //Locals States
  const [title, setTitle] = useState("");
  const [video_url, setVideo_url] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const { handleCloseModal, setLectures } = props;

  const hanleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleVideoUrlChange = (e) => {
    setVideo_url(e.target.value);
  };
  const hanleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const hanleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleLectureSubmit = async (e) => {
    e.preventDefault();

    const newLecture = {
      title,
      video_url,
      description,
      duration,
    };

    //When the course need to be created
    if (currentPath.pathname === "/courses/add") {
      setLectures((actualLectures) => {
        return [...actualLectures, newLecture];
      });
    } else {
      //when the course need to be updated
      try {
        const addLecture = await addLecturesService(newLecture, id);
        console.log(addLecture);
      } catch (err) {
        // setError ("Sorry, we couldn't send this data, try to change the")
        console.log(err);
      }
    }
    handleCloseModal();
  };

  return (
    <div>
      <h2 className="text-gray-800 border-b-2 text-xl font-bold">Lectures</h2>
      <div className="flex -mx-3">
        <div className="text-gray-400 w-full px-3 mb-12">
          <label className="text-xs font-semibold px-1">Title</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
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
        <div className="text-gray-400 w-full px-3 mb-12">
          <label className="text-xs font-semibold px-1">Description</label>
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
        <div className="text-gray-400 w-full px-3 mb-12">
          <label className="text-xs font-semibold px-1">Video URL</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <input
              value={video_url}
              onChange={handleVideoUrlChange}
              type="text"
              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="Video url"
            />
          </div>
        </div>
        <div className="text-gray-400 w-full px-3 mb-12">
          <label className="text-xs font-semibold px-1">Duration</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
            </div>
            <input
              value={duration}
              onChange={hanleDurationChange}
              type="number"
              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder="duration"
            />
          </div>
        </div>
      </div>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-5 flex gap-3">
          <button
            onClick={handleLectureSubmit}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Add
          </button>
          <button
            onClick={handleCloseModal}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLectures;
