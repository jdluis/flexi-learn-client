import { useState } from "react";
import { Link } from "react-router-dom";
import PaymentIntent from "./Payment/PaymentIntent";
import IsStudent from "../components/IsStudent";
import { ImVideoCamera } from "react-icons/im";
import { BsFillCartPlusFill } from "react-icons/bs";

function CourseInfo(props) {
  const { course, handleAddToCart } = props;
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBuyNow = () => {
    setShowPaymentIntent(true);
    setShowModal(true);
  };
  return (
    <div>
      <div className=" overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{course.title}</div>
          <p className="text-gray-200 text-base">{course.description}</p>
          <p className="text-gray-200 text-base">Topic: {course.topic}</p>
          <p className="text-gray-200 text-base">
            Total Duration: {course.totalDuration} minutes
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            <span>{course.price} $</span>
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{course.level}
          </span>
        </div>
        <div className="p-6">
          <h4 className="text-xl font-bold">Lectures</h4>
          <ul className="flex flex-col gap-4">
            {course.lectures &&
              course.lectures.map((lecture, index) => {
                return (
                  <li
                    className="pl-4 border-b justify-evenly flex items-center border-gray-500"
                    key={lecture._id}
                  >
                    <p>
                      {index}: {lecture.title}, duration: {lecture.duration}{" "}
                      minutes
                    </p>
                    <IsStudent>
                      <Link
                        className="bg-green-300 text-black rounded-lg  p-1"
                        to={`/courses/lecture/${lecture._id}`}
                      >
                        <ImVideoCamera />
                      </Link>
                    </IsStudent>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex justify-around">
          <IsStudent>
            <button onClick={handleAddToCart} className="btn p-2  ">
              <BsFillCartPlusFill className=" text-green-500 text-2xl" />
            </button>
            {showPaymentIntent === false ? (
              <button
                className="border-2 rounded-xl px-2 text-green-300 cursor-pointer hover:border-green-500  focus:border-green-500"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            ) : (
              <PaymentIntent
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                productDetails={course}
              />
            )}
          </IsStudent>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
