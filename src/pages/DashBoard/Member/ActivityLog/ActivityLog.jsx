import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";
import { Button, Card, Dialog, IconButton,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography, } from "@material-tailwind/react";
import { MdRemoveRedEye } from "react-icons/md";
import { useState } from "react";

const TABLE_HEAD = ["Name", "Email", "Status"];

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);

  const { data: log = {}, isLoading } = useQuery({
    queryKey: ["activityLog", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/trainer-status/${user?.email}`);
      return response.data;
    },
  });
  console.log(log);
  const handleOpen = () => setOpen(!open);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className=" max-w-screen-lg mx-auto">
        <Card className="shadow-lg">
          <div className="bg-orange-500 text-white p-6 rounded-t-lg">
            <Typography
              variant="h4"
              className="font-bold text-center uppercase"
            >
              My Activity Log
            </Typography>
          </div>
          <div className="p-6">
            {log != {} ? (
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
                    <tr
                      className={`
                         "bg-gray-50"  
                       hover:bg-gray-100 transition`}
                    >
                      <td className="p-4 border-b text-sm text-gray-700">
                        {log?.fullName || "Anonymous"}
                      </td>
                      <td className="p-4 border-b text-sm font-medium text-gray-800">
                        {log?.email}
                      </td>
                      <td className="p-4 border-b text-sm text-gray-800 ">
                        {log?.status === "Pending" ? (
                          <span className="bg-orange-100 p-3 rounded-full">{log?.status}</span>
                        ) : (
                          <span className="bg-orange-100 p-3 rounded-full">
                            {log?.status || "unavailable"}
                            <IconButton
                              variant="text"
                              color="red"
                              size="sm"
                              onClick={handleOpen}
                            >
                              <MdRemoveRedEye size={20} />
                            </IconButton>
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <Typography
                variant="paragraph"
                color="gray"
                className="text-center py-4"
              >
                No activitys found.
              </Typography>
            )}
          </div>
        </Card>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Feedback For You
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
         
          <Typography className="text-center font-normal">
            {log?.feedback}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ActivityLog;
