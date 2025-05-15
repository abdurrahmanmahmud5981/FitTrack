import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";
import { Helmet } from "react-helmet-async";

const BalanceOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["balanceOverview"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/admin/overview");
        return res.data;
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        throw new Error("Failed to fetch financial overview data");
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  const { totalBalance = 0, totalSubscribers = 0, bookings = [] } = overview;
  
  // Pie chart data
  const chartData = [
    {
      name: "Total Subscribers",
      value: totalSubscribers,
      color: "#ff7300",
    },
    {
      name: "Total Paid Members",
      value: bookings.length,
      color: "#00c49f",
    },
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 mx-auto space-y-4 sm:space-y-6 md:space-y-8">
      <Helmet>
        <title>FitTrack Admin - Balance Overview</title>
      </Helmet>
      
      {/* Overview Section */}
      <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-bold text-xl sm:text-2xl md:text-3xl">
          Balance Overview
        </Typography>
        <Typography variant="paragraph" className="text-gray-600 text-sm sm:text-base mt-2">
          View your total balance, last six transactions, and a comparison of
          subscribers vs paid members.
        </Typography>
      </div>
      
      {/* Total Balance Section */}
      <Card className="shadow-lg">
        <CardBody className="p-3 sm:p-4 md:p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="blue-gray" className="font-bold text-sm sm:text-base md:text-lg">
              Total Balance
            </Typography>
            <Typography variant="h5" className="text-gray-700 font-bold text-lg sm:text-xl md:text-2xl">
              ${totalBalance || 0}
            </Typography>
          </div>
        </CardBody>
      </Card>
      
      {/* Pie Chart Section */}
      <Card className="shadow-lg">
        <CardBody className="p-3 sm:p-4 md:p-6">
          <Typography variant="h6" color="blue-gray" className="font-bold mb-2 sm:mb-4 text-sm sm:text-base md:text-lg">
            Newsletter Subscribers vs Paid Members
          </Typography>
          
          <div className="flex justify-center w-full">
            <div className="w-full h-52 sm:h-64 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={30}
                    outerRadius="60%"
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Last Six Transactions Table */}
      <Card className="shadow-lg">
        <CardBody className="p-2 sm:p-4 md:p-6">
          <Typography variant="h6" color="blue-gray" className="font-bold mb-2 sm:mb-4 text-sm sm:text-base md:text-lg px-2">
            Last 6 Transactions
          </Typography>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="text-left bg-blue-100 text-xs sm:text-sm font-medium text-gray-700">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Date</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">User Name</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Amount</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Package</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm text-gray-600">
                {bookings?.slice(0, 6).map(
                  ({
                    _id: date,
                    paymentId,
                    packageName,
                    userName,
                    price,
                  }) => (
                    <tr
                      key={paymentId}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3 truncate max-w-16 sm:max-w-none">
                        {date}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 truncate max-w-16 sm:max-w-none">
                        {userName}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-orange-800">
                        ${price}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-blue-600 capitalize truncate max-w-16 sm:max-w-none">
                        {packageName}
                      </td>
                    </tr>
                  )
                )}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-2 sm:px-4 py-8 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BalanceOverview