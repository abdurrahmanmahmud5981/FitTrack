// Import necessary libraries and dependencies
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY); // Replace with your Stripe public key
import { Card } from '@material-tailwind/react';

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { state } = useLocation();
  const { user } = useAuth();
  console.log(state);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create PaymentIntent on the server
      const { data: clientSecret } = await axios.post(
        "/create-payment-intent",
        {
          amount: state?.price * 100, // Convert price to cents for Stripe
          currency: "usd",
        }
      );

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
        setPaymentSuccess(false);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);

        // Save payment info to the database
        // await axios.post("/save-payment-info", {
        //   trainerName,
        //   slotName,
        //   packageName,
        //   price,
        //   userName,
        //   userEmail,
        //   paymentId: paymentIntent.id,
        // });

        // Increase booking count
        // await axios.post("/increase-booking-count", {
        //   trainerName,
        //   slotName,
        // });
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="payment-page ">
        <h1>Payment Page 💸</h1>
        <div className="payment-details">
          <p>
            <strong>Trainer Name:</strong> {state?.trainer}
          </p>
          <p>
            <strong>Slot Name:</strong> {state?.slotName}
          </p>
          <p>
            <strong>Package Name:</strong> {state?.packageName}
          </p>
          <p>
            <strong>Price:</strong> ${state?.price}
          </p>
          <p>
            <strong>Your Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Your Email:</strong> {user?.email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <CardElement options={{ hidePostalCode: true }} />
          <button type="submit" disabled={!stripePromise || loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
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
