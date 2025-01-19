import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Details = () => {
  const { state } = useLocation(); // State passed via navigation
  const { id: applicantId } = useParams(); // Get applicant ID from URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // Use secure axios for authenticated requests

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [feedback, setFeedback] = useState(""); // Rejection feedback

  // Toggle Modal Visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Confirm button handler
  const handleConfirm = async () => {
    try {
      const res = await axiosSecure.patch(
        `/trainers/applicants/confirm/${applicantId}`,
        { email: state?.email }
      );
      console.log("Confirm", res.data);
      //   navigate("/applied-trainers");
      Swal.fire({
        title: "Applicant confirmed!",
        text: "The trainer has been notified about your confirmation.",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      console.error("Error confirming the applicant:", error);
       Swal.fire({
        title: "Error confirming the applicant!",
        text: `${error?.message}`,
        icon: "error",
        confirmButtonText: "Close",
       })
    }
  };

  // Reject button handler with feedback
  const handleReject = async () => {
    try {
       const res = await axiosSecure.patch(`/trainers/applicants/reject/${applicantId}`, { feedback });
       console.log(res.data);
    //   setIsModalOpen(false); // Close modal
    //   navigate("/applied-trainers");
    } catch (error) {
      console.error("Error rejecting the applicant:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl shadow-lg">
        {/* Header Section */}
        <CardHeader
          floated={false}
          className="bg-orange-600 text-center text-white py-6"
        >
          <Typography variant="h4" className="font-bold">
            Applicant Details
          </Typography>
        </CardHeader>

        {/* Body Section */}
        <CardBody>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <Avatar
              src={state?.profileImage || "https://via.placeholder.com/150"}
              alt="Applicant"
              size="xxl"
              className="border-4 border-gray-200"
            />
            {/* Applicant Details */}
            <div>
              <Typography variant="h6" className="font-semibold mb-2">
                {state?.fullName}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                <strong>Email:</strong> {state?.email}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                <strong>Age:</strong> {state?.age}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                <strong>Status:</strong>{" "}
                <span className="text-yellow-500 font-semibold">
                  {state?.status || "Pending"}
                </span>
              </Typography>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <Typography variant="h6" className="font-semibold mb-2">
              Biography
            </Typography>
            <Typography color="blue-gray" className="mb-4">
              {state?.biography}
            </Typography>

            <Typography variant="h6" className="font-semibold mb-2">
              Skills
            </Typography>
            <Typography color="blue-gray" className="mb-4">
              {state?.selectedSkills?.join(", ") || "No skills listed"}
            </Typography>

            <Typography variant="h6" className="font-semibold mb-2">
              Availability
            </Typography>
            <Typography color="blue-gray" className="mb-2">
              <strong>Days:</strong>{" "}
              {state?.availableDays?.join(", ") || "No days listed"}
            </Typography>
            <Typography color="blue-gray">
              <strong>Time:</strong> {state?.availableTime || "Not specified"}
            </Typography>
          </div>
        </CardBody>

        {/* Footer Section */}
        <CardFooter className="flex justify-between items-center py-4">
          <Button color="green" onClick={handleConfirm} className="px-6" ripple>
            Confirm
          </Button>
          <Button color="red" onClick={toggleModal} className="px-6" ripple>
            Reject
          </Button>
        </CardFooter>
      </Card>

      {/* Rejection Modal */}
      <Dialog
        size="sm"
        open={isModalOpen}
        handler={toggleModal}
        className="max-w-lg"
      >
        <DialogHeader>
          <Typography variant="h5" className="font-bold">
            Reject Application
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography className="mb-4">
            Are you sure you want to reject{" "}
            <span className="font-bold text-blue-600">{state?.fullName}</span>?
          </Typography>
          <Textarea
            label="Feedback (Optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide feedback for rejection..."
          />
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button
            color="gray"
            variant="text"
            onClick={toggleModal}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleReject}>
            Confirm Rejection
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Details;
