import { Card, Typography,  IconButton } from "@material-tailwind/react";
import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
const TABLE_HEAD = ["#", "Slot Name", "Class Name", "Action"];

const ManageSlot = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch slots data
  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ["manage-slots", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure(`/slots/${user?.email}`);
      return response.data;
    },
  });

  // Delete slot function
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axiosSecure.delete(`/slots/${id}`);
        Swal.fire("Deleted!", "The slot has been removed.", "success");
        refetch();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting the slot.", "error");
      }
    }
  };

  // Show loader while fetching data
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <Helmet>
        <title>FitTrack Trainer - Manage Slots</title>
      </Helmet>
      <Card className="shadow-lg">
        <div className="bg-orange-500 text-white p-6 rounded-t-lg">
          <Typography variant="h4" className="font-bold text-center uppercase">
            Manage Slots
          </Typography>
        </div>
        <div className="p-6">
          {slots.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-200">
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-4 text-sm font-semibold text-gray-700 border-b"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slots.map(({ slotName, class: className, _id }, index) => (
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
                        {slotName || "Anonymous"}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        {className || "N/A"}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        <IconButton
                          size="sm"
                          color="red"
                         
                          onClick={() => handleDelete(_id)}
                        >
                          <FaTrash className="h-5 w-5" />
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
              No slots available.
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ManageSlot;
