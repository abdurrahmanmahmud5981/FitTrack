import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";

const BalanceOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  // const [totalBalance, setTotalBalance] = useState(0);
  const [subscribersData, setSubscribersData] = useState({
    totalSubscribers: 0,
    totalPaidMembers: 0,
  });
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["balanceOverview"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/admin/overview");
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch financial overview data");
      }
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const { totalBalance = 0, totalSubscribers = 0, bookings = [] } = overview;
  console.log(overview);
  // Fetch data (Balance and Transactions)
  // useEffect(() => {
  //   const fetchBalanceData = async () => {
  //     try {
  //       const res = await axiosSecure.get("/financial-overview");
  //       if (res.data) {
  //         setTotalBalance(res.data.totalBalance);
  //         setTransactions(res.data.transactions);
  //         setSubscribersData({
  //           totalSubscribers: res.data.totalSubscribers,
  //           totalPaidMembers: res.data.totalPaidMembers,
  //         });
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Error fetching financial data",
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //       });
  //     }
  //   };

  //   fetchBalanceData();
  // }, [axiosSecure]);

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
    <div className="max-w-4xl mx-auto  space-y-8">
      {/* Overview Section */}
      <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Balance Overview
        </Typography>
        <Typography variant="paragraph" className="text-gray-600">
          View your total balance, last six transactions, and a comparison of
          subscribers vs paid members.
        </Typography>
      </div>
      {/* Total Balance Section */}
      <Card className="shadow-lg">
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Total Balance
            </Typography>
            <Typography variant="h5" className="text-gray-700 font-bold">
              ${totalBalance || 0}
            </Typography>
          </div>
        </CardBody>
      </Card>
      {/* Pie Chart Section */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
            Newsletter Subscribers vs Paid Members
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={150}
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
        </CardBody>
      </Card>

      {/* Last Six Transactions Table */}
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="font-bold mb-4">
            Last 6 Transactions
          </Typography>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="text-left bg-blue-100 text-sm font-medium text-gray-700">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">User Name</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Package</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {bookings
                  ?.slice(0, 6)
                  .map(
                    ({
                      _id: date,
                      paymentId,
                      packageName,
                      userName,
                      userEmail,
                      price,
                    }) => (
                      <tr
                        key={paymentId}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-3">
                         {date}
                        </td>
                        <td className="px-4 py-3">{userName}</td>
                        <td className="px-4 py-3 text-orange-800">${price}</td>
                        <td className="px-4 py-3 text-blue-600 capitalize">
                          {packageName}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BalanceOverview;
