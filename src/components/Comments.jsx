import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { addTestimonialService } from "../services/testimonial.services";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { editLecturesService } from "../services/lectures.services";
import Loading from "./Loading";
import { toast } from "react-toastify";
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
      toast.success(`Comment added: "${message}"`);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  if (lectureData === null) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <h3>{lectureData.title}</h3>
        <p>{lectureData.description}</p>
      </div>
      <div className="bg-stone-300 flex flex-col gap-3  text-black round-xl p-2 m-2">
        {lectureData.testimonials.reverse().slice(0,5).map((testimonial) => {
          return (
            <div
              key={testimonial._id}
              className="flex flex-col items-start gap-2 rounded-3xl bg-slate-400 p-2"
            >
              <h4 className="font-bold">
                {testimonial.author.first_name} {testimonial.author.last_name}{" "}
              </h4>
              <p className="pl-4">{testimonial.message}</p>
            </div>
          );
        })}
      </div>
      <button className="fixed bottom-20 right-10 btn-ok mt-10" onClick={handleOpenModal}>
        Add Comment
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
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Comments;
