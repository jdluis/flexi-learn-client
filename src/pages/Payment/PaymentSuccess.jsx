import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { updatePaymentIntentService } from "../../services/payment.services";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    };

    try {
      await updatePaymentIntentService(paymentIntentInfo);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <div className="m-20 flex flex-col items-center justify-center gap-10">
      <div>
        <h1 className="text-2xl">Thank you for your order!</h1>
      </div>

      <Link to={"/"}>
        <div className="w-40 h-40 ">
          <img
            className="w-full h-full focus:opacity-75 active:opacity-75 hover:opacity-75 object-cover rounded-full"
            src="/public/favicon_io/android-chrome-512x512.png"
            alt="logo flexlearn"
          />
        </div>
        <h3>Go back to Home </h3>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
