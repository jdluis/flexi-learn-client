import Comments from "../../components/Comments";
import VideoPlayer from "../../components/VideoPlayer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { oneLectureService } from "../../services/lectures.services";
import { ClipLoader } from "react-spinners";

function VideoPlataform() {
  const { idLecture } = useParams();
  const [lecture, setLecture] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [needRender, setNeedRender] = useState(false);
  
  useEffect(() => {
    getData();
  }, [needRender]);

  const getData = async () => {
    try {
      setIsFetching(true);
      const response = await oneLectureService(idLecture);
      setLecture(response.data);
      setIsFetching(false);
      console.log(response.data)
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }

    if (isFetching) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="#36d7b7" size={200} cssOverride={{}} loading />
        </div>
      );
    }
  };

  return (
    <div>
      <VideoPlayer lectureData={lecture} />
      <Comments lectureData={lecture} setNeedRender={setNeedRender} needRender={needRender}/>
    </div>
  );
}

export default VideoPlataform;
