import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Textarea,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import uploadImage from "../../api/uploadImage";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Skills data
const skillsOptions = [
  "Yoga",
  "Zumba",
  "Pilates",
  "Strength Training",
  "Cardio",
  "Body Combat",
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
  const axiosSecure = useAxiosSecure();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
      age: "",
      experience: "",
      biography: "",
      selectedSkills: [],
      availableDays: [],
      availableTime: "",
    },
  });

  // Handle Profile Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    if (photoURL) {
      setProfileImage(photoURL);
      console.log("Image uploaded successfully:", photoURL);
    }
  };

  // Remove Profile Image
  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  // Submit Handler
  const onSubmit = async (data) => {
    if (!profileImage) {
      Swal.fire({
        title: "Error",
        text: "Please upload a profile image!",
        icon: "error",
      });
      return;
    }

    try {
      const trainerData = {
        ...data,
        profileImage,
        availableDays: data.availableDays.map((day) => day.value),
        availableTime: data.availableTime.value,
        status: "Pending",
      };
      const result = await axiosSecure.post("/trainers", trainerData);
      console.log("Trainer Data:", result.data);
      if (result.data?.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Application submitted successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `${result.data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <Card className="shadow-lg">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-6">Be a Trainer</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <Input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="cursor-not-allowed"
                />
              </div>
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
                    type="button"
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
              <div className="">
                <List className="grid sm:grid-cols-2 gap-4">
                  {skillsOptions.map((skill) => (
                    <ListItem key={skill} className="p-0">
                      <label
                        htmlFor={skill}
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            id={skill}
                            value={skill}
                            defaultChecked={getValues(
                              "selectedSkills"
                            )?.includes(skill)}
                            {...register("selectedSkills", {
                              validate: (value) =>
                                value?.length > 0 ||
                                "Select at least one skill",
                            })}
                            onChange={(e) => {
                              const value = e.target.value;
                              const currentSkills =
                                getValues("selectedSkills") || [];
                              const updatedSkills = currentSkills.includes(
                                value
                              )
                                ? currentSkills.filter((s) => s !== value)
                                : [...currentSkills, value];
                              setValue("selectedSkills", updatedSkills, {
                                shouldValidate: true,
                              });
                            }}
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {skill}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              </div>
              {errors.selectedSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedSkills.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Available Days */}
              <div>
                <label className="block mb-2 font-medium">Available Days</label>
                <Controller
                  name="availableDays"
                  control={control}
                  rules={{
                    required: "Select at least one day",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={daysOptions}
                      placeholder="Select available days..."
                      className="basic-multi-select"
                    />
                  )}
                />
                {errors.availableDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableDays.message}
                  </p>
                )}
              </div>

              {/* Available Time */}
              <div>
                <label className="block mb-2 font-medium">Available Time</label>
                <Controller
                  name="availableTime"
                  control={control}
                  rules={{
                    required: "Select a time",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={timesOptions}
                      placeholder="Select available time..."
                    />
                  )}
                />
                {errors.availableTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block mb-2 font-medium">Age</label>
                <Input
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: {
                      value: 18,
                      message: "Must be at least 18 years old",
                    },
                  })}
                  placeholder="Enter your age"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block mb-2 font-medium">
                  Years Of Experience
                </label>
                <Input
                  type="number"
                  {...register("experience", {
                    required: "Experience is required",
                    min: { value: 0, message: "Must be a positive number" },
                  })}
                  placeholder="Enter years of experience"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>

            {/* Biography */}
            <div>
              <label className="block mb-2 font-medium">Biography</label>
              <Textarea
                {...register("biography", {
                  required: "Biography is required",
                  minLength: { value: 10, message: "Biography is too short" },
                })}
                placeholder="Write a short biography"
                rows={5}
              />
              {errors.biography && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.biography.message}
                </p>
              )}
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
