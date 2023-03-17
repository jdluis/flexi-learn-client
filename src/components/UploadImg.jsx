import { useHandleFileUpload } from "../Hooks/useHandleFileUpload";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UploadImg(props) {
  const { imageUrl, setImageUrl, isEditing } = props;
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    useHandleFileUpload(event, setIsUploading, setImageUrl, navigate);
  };
  return (
    <>
      {imageUrl ? (
        <div className="w-28 h-28">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="img"
            width={200}
          />
        </div>
      ) : null}
      {isEditing && (
        <div>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
      )}
      {isUploading ? <h3>... uploading image</h3> : null}
    </>
  );
}

export default UploadImg;
