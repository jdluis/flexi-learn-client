import { useHandleFileUpload } from "../Hooks/useHandleFileUpload";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UploadImg(props) {
    const {imageUrl, setImageUrl} = props
    const navigate = useNavigate();
      //cloudinary

  const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (event) => {
        useHandleFileUpload(event, setIsUploading, setImageUrl, navigate);
      };
  return (
    <div>
      {" "}
      <div>
        <label>Image: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>
      {isUploading ? <h3>... uploading image</h3> : null}
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="img" width={200} />
        </div>
      ) : null}
    </div>
  );
}

export default UploadImg;
