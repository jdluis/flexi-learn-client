import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { addTestimonialService } from "../services/testimonial.services";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { editLecturesService } from "../services/lectures.services";
import Loading from "./Loading";

Modal.setAppElement("#root");

function Comments(props) {
  const { idLecture } = useParams();
  const { lectureData, setNeedRender, needRender } = props;

  //Global Context
  const { loggedUser } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addingTestimonial, setAddingTestimonial] = useState(false);

  useEffect(() => {
    setNeedRender(!needRender);
  }, [addingTestimonial]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      setAddingTestimonial(true);
      const newTestimonial = await addTestimonialService({
        message,
        author: loggedUser._id,
      });

      await editLecturesService(idLecture, {
        testimonial: newTestimonial.data._id,
      });

      setAddingTestimonial(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (lectureData === null) {
    return <Loading />;
  } else {
    console.log(lectureData);
  }

  return (
    <div>
      <div>
        <h3>{lectureData.title}</h3>
        <p>{lectureData.description}</p>
      </div>
      <div className="bg-stone-300 flex flex-col gap-3  text-black round-xl p-2 m-2">
        {lectureData.testimonials.map((testimonial) => {
          return (
            <div className="flex items-start gap-2 rounded-3xl bg-slate-400 p-2">
              <h4>Author: </h4>
              <p>{testimonial.message}</p>
            </div>
          );
        })}
      </div>
      <button className="btn-ok mt-10 w-full" onClick={handleOpenModal}>
        Add
      </button>
      <Modal
        overlayClassName={"fixed bottom-0 bg-red-400 m-0 p-0  w-full"}
        className={"relative"}
        closeTimeoutMS={200}
        contentLabel="modal"
        isOpen={showModal}
      >
        <div className="text-black flex flex-col">
          <textarea
            placeholder="You like this course?"
            className="bg-gray-200 p-2 border-2 border-zinc-700"
            value={message}
            onChange={handleMessage}
          ></textarea>
          <div className="flex justify-evenly">
            <button className="btn-back " onClick={handleCloseModal}>
              Cancel
            </button>
            <button className="btn-ok" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Comments;
