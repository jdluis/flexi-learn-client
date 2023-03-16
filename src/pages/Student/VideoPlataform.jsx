import Comments from "../../components/Comments";
import VideoPlayer from "../../components/VideoPlayer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  oneLectureService,
  getCourseByLectureService,
} from "../../services/lectures.services";
import { ClipLoader } from "react-spinners";
import { Collapse } from "react-collapse";
import { toast } from "react-toastify";
import { BsFlag } from 'react-icons/bs';

function VideoPlataform() {
  const { idLecture } = useParams();
  const [lecture, setLecture] = useState(null);
  const [course, setCourse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [needRender, setNeedRender] = useState(false);

  const [openClass, setOpenClass] = useState(true);
  const [needResources, setNeedResources] = useState(false);
  const [needOpenComment, setNeedOpenComment] = useState(false);

  const handleOpenClass = () => {
    setOpenClass(!openClass);
    setNeedResources(false);
    setNeedOpenComment(false);
  };

  const handleOpenResources = () => {
    setNeedResources(!needResources);
    setOpenClass(false);
    setNeedOpenComment(false);
  };

  const handleOpenComments = () => {
    setNeedOpenComment(!needOpenComment);
    setNeedResources(false);
    setOpenClass(false);
  };

  useEffect(() => {
    getLectureData();
    getCourseData();
  }, []);

  const getLectureData = async () => {
    try {
      setIsFetching(true);
      const response = await oneLectureService(idLecture);
      setLecture(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  const getCourseData = async () => {
    try {
      setIsFetching(true);
      const response = await getCourseByLectureService(idLecture);
      setCourse(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  const activeStyles = {
    textDecoration: "underline",
    textDecorationThickness: "4px",
    color: "green",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  if (openClass || needResources || needOpenComment) {

  }

  if (isFetching || lecture === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" size={200} cssOverride={{}} loading />
      </div>
    );
  }

  return (
    <div>
      <VideoPlayer lectureData={lecture} />
      <div className="px-6 pb-2 mt-4 border-b border-zinc-500  m-auto">
        <h2 className="text-xl"> {lecture.title}</h2>
        <p className="text-lg text-gray-500">{lecture.description}</p>
      </div>
      <div className="flex justify-evenly py-2">
        <button
          className="text-gray-400  font-bold"
          style={openClass ? activeStyles : inActiveStyles}
          onClick={handleOpenClass}
        >
          Class
          <div></div>
        </button>
        <button
          className="text-gray-400 font-bold"
          style={needResources ? activeStyles : inActiveStyles}
          onClick={handleOpenResources}
        >
          Resources
        </button>
        <button
          className="text-gray-400  font-bold"
          style={needOpenComment ? activeStyles : inActiveStyles}
          onClick={handleOpenComments}
        >
          Comments
        </button>
      </div>
      <div className="p-8">
        <Collapse isOpened={openClass}>
          {course.lectures &&
            course.lectures.map((lecture) => {
              return (
                <Link key={lecture._id} to={`/courses/lecture/${lecture._id}`} className="flex  items-center gap-4 border-b w-full border-gray-500 pb-2">
                <BsFlag  className="text-2xl text-green-600"/>
                <div>
                <p className="font-bold"> {lecture.title}</p>  <p className="text-xs">{lecture.duration} minutes</p>
                </div>
                </Link>
              );
            })}
        </Collapse>
        <Collapse isOpened={needResources}>
          <div>
            Resources content will be here soon, sorry fot he inconveniences
          </div>
        </Collapse>
        <Collapse isOpened={needOpenComment}>
          <Comments
            getLectureData={getLectureData}
            lectureData={lecture}
            setNeedRender={setNeedRender}
            needRender={needRender}
          />
        </Collapse>
      </div>
    </div>
  );
}

export default VideoPlataform;
