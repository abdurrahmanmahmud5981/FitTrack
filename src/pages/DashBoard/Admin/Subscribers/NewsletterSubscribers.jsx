import { Card, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet-async";

const TABLE_HEAD = ["#", "Name", "Email"];

const NewsletterSubscribers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch subscribers data using React Query
  const { data: subscribers = [], isLoading, isError, error } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/subscribers");
      return response.data;
    },
  });

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" color="blue-gray" className="font-medium">
          Loading subscribers...
        </Typography>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="h5" color="red" className="font-medium text-center">
          Error: {error.message || "Unable to fetch subscribers."}
        </Typography>
      </div>
    );
  }

  // Main UI
  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <Helmet>
        <title>FitTrack Admin - Newsletter Subscribers</title>
      </Helmet>
      <Card className="shadow-lg">
        <div className="bg-orange-500 text-white p-6 rounded-t-lg">
          <Typography variant="h4" className="font-bold text-center uppercase">
            Newsletter Subscribers
          </Typography>
        </div>
        <div className="p-6">
          {subscribers.length > 0 ? (
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
                  {subscribers.map(({ name, email, _id }, index) => (
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
                        {name || "Anonymous"}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-600">
                        {email}
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
              No subscribers found.
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NewsletterSubscribers;
