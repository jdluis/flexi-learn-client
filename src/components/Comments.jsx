import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { addTestimonialService } from "../services/testimonial.services";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { editLecturesService } from "../services/lectures.services";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { IoMdSend } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root");

function Comments(props) {
  const { idLecture } = useParams();
  const { lectureData, getLectureData, setNeedRender, needRender } = props;

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
      getLectureData();
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
      <div className="bg-stone-300 flex flex-col gap-3  text-black round-xl p-2 m-2">
        {lectureData.testimonials
          .reverse()
          .slice(0, 5)
          .map((testimonial) => {
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
      <button
        className="fixed bottom-20 right-10 btn-ok mt-10"
        onClick={handleOpenModal}
      >
        Add Comment
      </button>
      <Modal
        overlayClassName={"fixed bottom-14 bg-primary m-0  w-full"}
        className={"relative"}
        closeTimeoutMS={1000}
        contentLabel="modal"
        isOpen={showModal}
      >
        <div className="text-black flex justify-evenly mx-4 items-center">
          <button className="text-gray-400 text-xl" onClick={handleCloseModal}>
            <AiOutlineClose />
          </button>
          <textarea
            placeholder="You like this course?"
            className="pt-2 caret-lime-600 outline-none bg-transparent text-gray-500 h-auto px-2 w-full "
            value={message}
            onChange={handleMessage}
          ></textarea>
          <button className="text-gray-400 text-xl" onClick={handleAddComment}>
            <IoMdSend />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Comments;
