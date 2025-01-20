import { Card, Typography, IconButton } from "@material-tailwind/react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["#", "Name", "Email", "Details"];

const AppliedTrainer = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch trainers data using React Query
  const {
    data: trainers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/trainers?status=Pending");
      return response.data;
    },
  });

  console.log(trainers);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" color="blue-gray" className="font-medium">
          Loading trainers...
        </Typography>
      </div>
    );
  }

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
      <Card className="shadow-lg">
        <div className="bg-orange-500 text-white p-6 rounded-t-lg">
          <Typography variant="h4" className="font-bold text-center uppercase">
            Applied Trainers
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
                  {trainers.map((trainer, index) => (
                    <tr
                      key={trainer?._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="p-4 border-b text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="p-4 border-b text-sm font-medium text-gray-800">
                        {trainer?.fullName || "Unknown"}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        {trainer?.email}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        <IconButton
                          variant="text"
                          color="red"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/dashboard/applied-trainers/details/${trainer?._id}`
                            , {state: trainer})
                          }
                          // disabled={deleteTrainerMutation.isLoading}
                        >
                          <MdRemoveRedEye size={20} />
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

export default AppliedTrainer;
