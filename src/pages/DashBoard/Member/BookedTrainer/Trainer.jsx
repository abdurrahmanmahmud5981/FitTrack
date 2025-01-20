/* eslint-disable react/prop-types */
import { Button, Card, Rating } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Trainer = ({
  modalOpen,
  trainer = {},
  handleModalOpen,
  handleModalClose,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    trainer: trainerName,
    trainerEmail,
    className,
    days,
    slotName,
    price,
    packageName,
  } = trainer || {};

  const [review, setReview] = useState({
    feedback: "",
    rating: 0,
  });
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedback = {
        ...review,
        packageName,
        className,
        userName: user?.displayName,
        userImage: user?.photoURL,
        date: new Date().toLocaleDateString(),
      };
      const res = await axiosSecure.post("/reviews", feedback);
     
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Review submitted successfully!",
          icon: "success",
        });
        handleModalClose();
        setReview({ feedback: "", rating: 0 });
      }
    } catch (error) {
      Swal.fire({
        title: "Error submitting review",
        icon: "error",
        text: error.message,
      });
    }
  };

  return (
    <div>
      {trainer ? (
        <Card className="space-y-4 p-6 bg-transparent ring ring-gray-300 text-gray-800">
          <div className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Trainer Info</h2>
            <p>
              <strong>Name:</strong> {trainerName}
            </p>
            <p>
              <strong>Email:</strong> {trainerEmail}
            </p>
          </div>

          <div className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Classes Info</h2>
            <p>
              <strong>Class Name:</strong> {className}
            </p>
            <p>
              <strong>Days:</strong> {days}
            </p>
          </div>

          <div className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Slot Info</h2>
            <p>
              <strong>Slot Name:</strong> {slotName}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
            <p>
              <strong>Package Name:</strong> {packageName}
            </p>
          </div>

          <Button
            className="w-fit"
            color="deep-orange"
            onClick={handleModalOpen}
          >
            Leave a Review
          </Button>
        </Card>
      ) : (
        <p>Loading trainer details...</p>
      )}
      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label htmlFor="feedback" className="block mb-2 font-medium">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full p-2 border rounded resize-none"
                  rows="4"
                  value={review.feedback}
                  onChange={(e) =>
                    setReview({ ...review, feedback: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2 font-medium">
                  Rating (1-5)
                </label>
                <Rating
                  size="lg"
                  style={{ maxWidth: 250 }}
                  value={review.rating}
                  onChange={(e) => setReview({ ...review, rating: Number(e) })}
                  isRequired
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <Button type="submit" color="orange">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
