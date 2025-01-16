import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Textarea,
} from "@material-tailwind/react";
import Select from "react-select";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import uploadImage from "../../api/uploadImage";
import Swal from "sweetalert2";

// Mock user data (replace with actual data from auth/firebase)
const userData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

// Skills data
const skillsOptions = [
  "Yoga",
  "Zumba",
  "Pilates",
  "Strength Training",
  "Cardio",
];

// Days of the week for React Select
const daysOptions = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

// Times of the day for React Select
const timesOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

const BeTrainer = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState("");
  const [biography, setBiography] = useState("");

  // Handle Profile Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    console.log("Photo URL:", photoURL);
    if (photoURL) {
      setProfileImage(photoURL);
      console.log("Image uploaded successfully:", photoURL);
    }
  };

  // Remove Profile Image
  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !age ||
      !selectedSkills.length ||
      !availableDays.length ||
      !availableTime ||
      !biography
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all required fields!",
        icon: "error",
      });
      return;
    }
    const trainerData = {
      fullName: user?.displayName,
      email: user?.email,
      age,
      experience,
      profileImage,
      skills: selectedSkills,
      availableDays: availableDays.map((day) => day.value),
      availableTime,
      status: "Pending",
    };

    console.log("Trainer Data:", trainerData);
    // Submit trainerData to the database (e.g., Firebase, Axios)
    alert("Application submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-6">Be a Trainer</h2>

          {/* Trainer Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <Input
                type="text"
                value={user?.displayName}
                readOnly
                className="cursor-not-allowed appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <Input
                type="email"
                value={user?.email}
                readOnly
                className="cursor-not-allowed appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block mb-2 font-medium">Profile Image</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="profileImage"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200 transition-all"
                >
                  <FiUpload size={18} />
                  Upload Image
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {profileImage && (
                <div className="mt-3 relative">
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border shadow-sm"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                    onClick={handleRemoveImage}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-2 font-medium">Skills</label>
              <div className="grid grid-cols-2 gap-3">
                {skillsOptions.map((skill) => (
                  <label key={skill} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={skill}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedSkills((prev) =>
                          prev.includes(value)
                            ? prev.filter((s) => s !== value)
                            : [...prev, value]
                        );
                      }}
                      checked={selectedSkills.includes(skill)}
                      className="cursor-pointer"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            {/* Available Days */}
            <div>
              <label className="block mb-2 font-medium">Available Days</label>
              <Select
                isMulti
                options={daysOptions}
                value={availableDays}
                onChange={setAvailableDays}
                placeholder="Select available days..."
                className="basic-multi-select"
              />
            </div>

            {/* Available Time */}
            <div>
              <label className="block mb-2 font-medium">Available Time</label>
              {/* <Input
                type="time"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                placeholder="Select available time"
              /> */}
              <Select
                options={timesOptions}
                value={availableTime}
                onChange={setAvailableTime}
                placeholder="Select available days..."
                className="basic-multi-select"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Age */}
              <div>
                <label className="block mb-2 font-medium">Age</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className=" appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              {/* years or experience */}
              <div>
                <label className="block mb-2 font-medium">
                  Years Of Experience
                </label>
                <Input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Enter your age"
                  className=" appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            {/* Biography */}
            <div>
              <label className="block text-gray-600 mb-2 font-medium">
                Biography <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                placeholder="Write a short biography"
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                rows={5}
              ></Textarea>
            </div>

            {/* Apply Button */}
            <Button color="orange" type="submit" fullWidth>
              Apply
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BeTrainer;
