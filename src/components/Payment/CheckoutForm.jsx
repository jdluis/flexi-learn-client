import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth.context";

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { removeProductFromCartServices } from "../../services/student.services.js";
import BackBtn from "../BackBtn";

function CheckoutForm(props) {
  Modal.setAppElement("#root");

  //Global Context
  const { loggedInstructorId, loggedStudentId, loggedUser } =
    useContext(AuthContext);

  const { showModal, handleCloseModal, productDetails } = props;
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const REACT_APP_CLIENT_URL = import.meta.env.VITE_REACT_APP_CLIENT_URL;

  const removeProductFromCart = async () => {
    try {
      console.log("Aquiiii intento eliminar")
      await removeProductFromCartServices(loggedStudentId, productDetails._id);
    } catch (error) {
      toast.error(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${REACT_APP_CLIENT_URL}/payment-success`,
      },
    });

    //Remove product from the cart
    removeProductFromCart(); //No se esta ejecutando...

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Modal contentLabel="modal" isOpen={showModal}>
    <button className="text-black text-2xl relative bottom-3" onClick={handleCloseModal}>X</button>
      <form className="mb-10" id="payment-form" onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="text-white font-bold p-2 active:opacity-70 hover:opacity-70   border-2 w-full bg-green-500"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              <button>Pay now</button>
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Modal>
  );
}

export default CheckoutForm;
