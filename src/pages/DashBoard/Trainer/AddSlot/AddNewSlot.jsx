import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { availableClasses, daysOptions, timesOptions } from "../../../../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../../components/shared/LodingSpinner";

const AddNewSlot = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedDays, setSelectedDays] = useState([]);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState(0);
  const [selectedClasses, setSelectedClasses] = useState("");

  const { data: trainerId = "" , isLoading} = useQuery({
    queryKey: ["trainerId", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer-id/${user?.email}`);
      return res.data?.trainerId;
    },
  });
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const slotData = {
        trainerName: user?.displayName,
        trainerEmail: user?.email,
        slotName: slotName?.label,
        slotTime,
        days: selectedDays.map((day) => day.value),
        class: selectedClasses.label,
      };
      const res = await axiosSecure.post("/slots", slotData);
      await axiosSecure.patch(`/classes/${selectedClasses.label}`, {
        trainerId: trainerId,
        trainerName: user?.displayName,
        trainerImage: user?.photoURL,
      });
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Slot Added Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setSlotName("");
        setSelectedDays([]);
        setSelectedClasses("");
        setSlotTime(0);
      }
    } catch (error) {
      Swal.fire({
        title: `Failed to Add Slot! ${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if(isLoading) return <LoadingSpinner/>
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8  ">
      <Helmet>
        <title> FitTrack Trainer - Add New Slot </title>
      </Helmet>
      {/* Header Section */}
      <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Add New Slot
        </Typography>
        <Typography variant="paragraph" className="text-gray-600">
          Fill out the details below to add a new training slot.
        </Typography>
      </div>

      <Card className="shadow-lg">
        <CardBody>
          {/* Trainer Information (Read Only) */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Name:</strong> {user?.displayName}
              </div>
              <div>
                <strong>Email:</strong> {user?.email}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Days */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Days
                </label>
                <Select
                  required
                  isMulti
                  options={daysOptions}
                  value={selectedDays}
                  onChange={setSelectedDays}
                  placeholder="Choose available days..."
                  className="react-select-container"
                />
              </div>
              {/* Slot Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Slot
                </label>
                <Select
                  required
                  options={timesOptions}
                  value={slotName}
                  onChange={setSlotName}
                  placeholder="Select slot name (e.g., Morning Slot)."
                  className="react-select-container"
                />
              </div>
              {/* Slot Time */}
              <div>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  label="Slot Time"
                  required
                  defaultValue={slotTime || 0}
                  onChange={(e) => setSlotTime(parseInt(e.target.value))}
                  placeholder="Enter slot time (e.g., 1 hour)"
                  className="input-field"
                />
              </div>

              {/* Select Classes */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Classe
                </label>
                <Select
                  required
                  options={availableClasses}
                  value={selectedClasses}
                  onChange={setSelectedClasses}
                  placeholder="Select relevant classes..."
                  className="react-select-container"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  color="orange"
                  type="submit"
                  fullWidth
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  Add Slot
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNewSlot;
