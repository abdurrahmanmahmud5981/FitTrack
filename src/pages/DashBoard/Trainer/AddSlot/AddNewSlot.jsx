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

const AddNewSlot = () => {
  const { user } = useAuth();
  const trainerData = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const availableClasses = [
    { value: "yoga", label: "Yoga" },
    { value: "zumba", label: "Zumba" },
    { value: "pilates", label: "Pilates" },
    { value: "strength-training", label: "Strength Training" },
  ];

  const daysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const slotData = {
      trainerId: trainerData.id,
      slotName,
      slotTime,
      days: selectedDays.map((day) => day.value),
      classes: selectedClasses.map((cls) => cls.value),
    };

    console.log("Slot Data:", slotData);
    alert("Slot added successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8  ">
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
                <Input
                  type="text"
                  required
                  label="Slot Name"
                  value={slotName}
                  onChange={(e) => setSlotName(e.target.value)}
                  placeholder="Enter slot name (e.g., Morning Slot)"
                  className="input-field"
                />
              </div>

              {/* Slot Time */}
              <div>
                <Input
                  type="time"
                  label="Slot Time"
                  required
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  placeholder="Enter slot time (e.g., 1 hour)"
                  className="input-field"
                />
              </div>

              {/* Select Classes */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Classes
                </label>
                <Select
                  required
                  isMulti
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
