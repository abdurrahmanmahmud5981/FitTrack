import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";

// const BookedTrainer = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data, isLoading } = useQuery({
//     queryKey: ["booked-trainer", user?.email],
//     queryFn: async () => {
//       const response = await axiosSecure(`/bookings/${user?.email}`);
//       return response.data;
//     }
//   });

//   if (isLoading) return <LoadingSpinner />;
//   console.log(data);
//   return <div>BookedTrainer</div>;
// };

// export default BookedTrainer;

import { useState, useEffect } from "react";
import axios from "axios";
import Trainer from "./Trainer";

const BookedTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["booked-trainer", user?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/bookings/${user?.email}`);
      return response.data;
    },
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="">
        <h2 className="text-3xl font-bold mb-4">Booked Trainers</h2>
        {trainers?.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {trainers?.map((trainer) => (
              <Trainer
                key={trainer?._id}
                trainer={trainer}
                modalOpen={modalOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="">
              <p>No bookings found.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookedTrainer;
