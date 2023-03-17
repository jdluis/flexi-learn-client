import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { getCartProductsService } from "../../services/student.services";
import { AuthContext } from "../../context/auth.context";
import { ClipLoader } from "react-spinners";
import PaymentIntent from "../../components/Payment/PaymentIntent";
import { BsFillCartPlusFill } from "react-icons/bs";
import IsStudent from "../../components/IsStudent";
import { Link } from "react-router-dom";

function Cart() {
  //Global Context
  const { loggedStudentId, loggedUser } = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(true);
  const [products, setProducts] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBuyNow = () => {
    setShowPaymentIntent(true);
    setShowModal(true);
  };

  useEffect(() => {
    getProductsFromCart();
  }, []);

  const getProductsFromCart = async () => {
    try {
      setIsFetching(true);
      const response = await getCartProductsService(loggedStudentId);

      setProducts(response.data.cartCourses);
      setIsFetching(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  if (isFetching === true) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" size={200} cssOverride={{}} loading />
      </div>
    );
  }

  return (
    <div className="mt-20 w-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">My Cart</h2>
      <div className="flex w-full p-5 flex-col gap-5 justify-center items-start">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="flex justify-evenly shadow-xl w-full pr-10 "
            >
              <Link to={`/courses/details/${product._id}`} className="flex gap-5 justify-start shadow-xl w-full">
                <div className="w-20 h-20 bg-slate-500 p-2">
                  <img
                    className="object-cover w-full h-full"
                    src={product.coverImg_url}
                    alt={product.title}
                  />
                </div>
                <div>
                  <h2>{product.title}</h2>
                  <p> {product.price / 100} 💶</p>
                </div>
              </Link>
              <div className="justify-self-end self-center ">
                <IsStudent>
                  {showPaymentIntent === false ? (
                    <button className="w-full" onClick={handleBuyNow}>
                      Buy
                    </button>
                  ) : (
                    <PaymentIntent
                      showModal={showModal}
                      handleCloseModal={handleCloseModal}
                      productDetails={product}
                    />
                  )}
                </IsStudent>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
