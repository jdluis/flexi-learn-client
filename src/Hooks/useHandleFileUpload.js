import { uploadImageService } from "../services/upload.services";

// below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
const useHandleFileUpload = async (
  event,
  setIsUploading,
  setImageUrl,
  navigate
) => {
  // console.log("The file to be uploaded is: ", e.target.files[0]);

  if (!event.target.files[0]) {
    // to prevent accidentally clicking the choose file button and not selecting a file
    return;
  }

  setIsUploading(true); // to start the loading animation

  const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
  uploadData.append("image", event.target.files[0]);
  //                   |
  //     this name needs to match the name used in the middleware => uploader.single("image")

  try {
    const response = await uploadImageService(uploadData);
    // or below line if not using services
    // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

    setImageUrl(response.data.imageUrl);
    //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

    setIsUploading(false); // to stop the loading animation
  } catch (error) {
    navigate("/error");
  }
};

export { useHandleFileUpload };


/*  Guia:

- Crear el state:
  const [imageUrl, setImageUrl] = useState("");

- Llamar al componente: 
<UploadImg imageUrl={imageUrl} setImageUrl={setImageUrl} />
En el body

- Poner el imageUrl en el objeto que vayamos a enviar a la base de datos
ejm: image: imageUrl

*/