import { Card, Typography, IconButton } from "@material-tailwind/react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";

const TABLE_HEAD = ["#", "Name", "Email", "Actions"];

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch trainers data using React Query
  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trainers", "Verified"],
    queryFn: async () => {
      const response = await axiosSecure.get("/trainers?status=Verified");
      return response.data;
    },
  });

  // Handle delete trainer
  const handleDeleteTrainer = async (trainerId, trainerEmail) => {
    // Show confirmation dialog before deleting
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      try {
        await axiosSecure.delete(
          `/trainers/${trainerId}?email=${trainerEmail}`
        );
        Swal.fire("Deleted!", "Trainer has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `${error.message}`,
          icon: "error",
        });
      }
    }
  };

  // Handle loading state
  if (isLoading) return <LoadingSpinner/>

  // Handle error state
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography
          variant="h5"
          color="red"
          className="font-medium text-center"
        >
          Error: {error.message || "Unable to fetch trainers."}
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <Helmet>
        <title> FitTrack Admin - All Trainers </title>
      </Helmet>
      <Card className="shadow-lg">
        <div className="bg-orange-500 text-white p-6 rounded-t-lg">
          <Typography variant="h4" className="font-bold text-center uppercase">
            All Trainers
          </Typography>
        </div>
        <div className="p-6">
          {trainers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100">
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-4 text-sm font-semibold text-gray-600 border-b"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainers.map(({ _id, fullName, email }, index) => (
                    <tr
                      key={_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="p-4 border-b text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="p-4 border-b text-sm font-medium text-gray-800">
                        {fullName || "Unknown"}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        {email}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        <IconButton
                          variant="text"
                          color="red"
                          size="sm"
                          onClick={() => handleDeleteTrainer(_id, email)}
                        >
                          <MdDelete size={20} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography
              variant="paragraph"
              color="gray"
              className="text-center py-4"
            >
              No trainers found.
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AllTrainers;
