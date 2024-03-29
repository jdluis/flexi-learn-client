// in "src/components/PaymentIntent.jsx"

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import { createPaymentIntentService } from "../../services/payment.services";

const REACT_APP_STRIPE_PUBLISHABLE_KEY = import.meta.env
  .VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY;
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY); // Make sure you add your publishable API key to the .env.local

function PaymentIntent(props) {
  const [clientSecret, setClientSecret] = useState("");
  const { showModal, handleCloseModal, productDetails } =
    props;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    //this is the product info sent to the backend with the product to purchase
    const response = await createPaymentIntentService(productDetails);
    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            productDetails={productDetails}
          />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;
