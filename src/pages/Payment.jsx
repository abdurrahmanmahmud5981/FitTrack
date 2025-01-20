// Import necessary libraries and dependencies
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY); // Replace with your Stripe public key
import { Button, Card, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();
  const { user } = useAuth();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSecret = async () => {
    const { data: clientSecret } = await axiosSecure.post(
      "/create-payment-intent",
      {
        amount: state?.price * 100,
      }
    );
    setClientSecret(clientSecret?.clientSecret);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create PaymentIntent on the server
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        }
      );

      if (error) {
        console.error("Payment error:", error);
        Swal.fire({
          title: "Payment Failed",
          text: `Sorry, ${error.message}`,
          icon: "error",
        });
        setPaymentSuccess(false);
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          title: "Payment Successful",
          text: "Thank you for booking with us!",
          icon: "success",
        });
        setPaymentSuccess(true);
        // Save payment info to the database
        await axiosSecure.post(`/bookings`, {
          ...state,
          userName: user?.displayName,
          userEmail: user?.email,
          paymentId: paymentIntent.id,
        });

        // Increase booking count
        await axiosSecure.patch(
          `/classes/increment-bookings/${state?.className}`
        );
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      Swal.fire({
        title: "Payment Failed",
        text: `Sorry, an error occurred while processing your payment`,
        icon: "error",
      });
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>FitTrack - Payment Details </title>
      <meta name="description" content="Payment details for your fitness booking" />
    </Helmet>
      <Card className=" max-w-screen-md mx-auto my-14 payment-page bg-transparent text-gray-400 ring ring-gray-800 p-6 space-y-6">
        <Typography variant="h3" color="deep-orange">
          Payment Page 💸
        </Typography>
        <div className="payment-details space-y-2">
          <p>
            <strong>Trainer Name: </strong> {state?.trainer}
          </p>
          <p>
            <strong>Slot Name: </strong> {state?.slotName}
          </p>
          <p>
            <strong>Package Name: </strong> {state?.packageName}
          </p>
          <p>
            <strong>Price: </strong> $ {state?.price}
          </p>
          <p>
            <strong>Your Name: </strong> {user?.displayName}
          </p>
          <p>
            <strong>Your Email: </strong> {user?.email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="payment-form space-y-4">
          <CardElement
            className=" ring bg-black text-white ring-orange-900 px-3 py-6 rounded-lg "
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#fff",
                  },
                },
              },
            }}
          />
          <Button
            variant="gradient"
            color="deep-orange"
            type="submit"
            disabled={!stripePromise || loading || !stripe}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </form>

        {paymentSuccess === true && (
          <p className="success-message">Payment Successful! 🎉</p>
        )}
        {paymentSuccess === false && (
          <p className="error-message">Payment Failed. Please try again.</p>
        )}
      </Card>
    </>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
  );
};

export default PaymentPage;
