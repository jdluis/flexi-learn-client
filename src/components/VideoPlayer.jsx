import ReactPlayer from "react-player";
import Loading from "./Loading";

function VideoPlayer(props) {
  const {lectureData} = props

  if (lectureData === null) {
    return <Loading />;
  }
  
  return (
    <div className="">
      <ReactPlayer width="100%" height="280px"  controls={true} url={lectureData.video_url} />
    </div>
  );
}

export default VideoPlayer;
