import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";

import { useState } from "react";

import Trainer from "./Trainer";
import { Helmet } from "react-helmet-async";

const BookedTrainer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["booked-trainer", user?.email],
    enabled: !!user?.email,
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>
          {trainers.length > 0
            ? `My Booked Trainers (${trainers.length})`
            : "No Bookings Found"} - Dashboard
        </title>
      </Helmet>
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
            <div className="flex flex-col items-center justify-center mt-10">
              <p className="text-gray-600 text-lg">
                No bookings found. Start exploring and book your first trainer!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookedTrainer;
