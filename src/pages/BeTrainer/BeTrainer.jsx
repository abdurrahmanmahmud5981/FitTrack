import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import uploadImage from "../../api/uploadImage";
import { daysOptions, timesOptions } from "../../api";

// Skills options
const skillsOptions = [
  "Yoga",
  "Zumba",
  "Pilates",
  "Strength Training",
  "Cardio",
  "Body Combat",
];

const BeTrainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profileImage, setProfileImage] = useState(user?.photoURL);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
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

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    if (photoURL) {
      setProfileImage(photoURL);
    }
  };

  // Remove uploaded profile image
  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  // Form submission
  const onSubmit = async (data) => {
    if (!profileImage) {
      Swal.fire({
        title: "Missing Image",
        text: "Please upload a profile image before submitting.",
        icon: "error",
      });
      return;
    }

    const trainerData = {
      ...data,
      fullName: user?.displayName,
      profileImage,
      availableDays: data.availableDays.map((day) => day.value),
      availableTime: data.availableTime.value,
      status: "Pending",
    };

    try {
      const response = await axiosSecure.post("/trainers", trainerData);
      if (response.data?.insertedId) {
        Swal.fire({
          title: "Application Submitted",
          text: "Your application has been received. We'll get back to you soon.",
          icon: "success",
        });
        navigate("/dashboard/activity-log");
      } else {
        throw new Error(response.data?.message || "Unknown server error");
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-16">
      <Helmet>
        <title>FitTrack | Become a Trainer</title>
        <meta
          name="description"
          content="Apply to become a certified fitness trainer at FitTrack. Complete your profile, set your availability, and join our team."
        />
        <meta property="og:title" content="FitTrack | Become a Trainer" />
        <meta
          property="og:description"
          content="Apply to become a certified fitness trainer at FitTrack. Complete your profile, set your availability, and join our team."
        />
      </Helmet>

      <Card className="shadow-lg bg-transparent text-white ring ring-gray-800">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-6">Become a Trainer</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <Input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="cursor-not-allowed text-gray-300"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="cursor-not-allowed text-gray-300"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 font-medium">Profile Image</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="profileImage"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200 transition"
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
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-md border shadow-sm"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    onClick={handleRemoveImage}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Skills Selection */}
            <div>
              <label className="block mb-2 font-medium">Skills</label>
              <List className="grid sm:grid-cols-2 gap-4">
                {skillsOptions.map((skill) => (
                  <ListItem
                    key={skill}
                    className="p-0 hover:bg-transparent active:bg-transparent"
                  >
                    <label
                      htmlFor={skill}
                      className="flex w-full items-center cursor-pointer px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id={skill}
                          value={skill}
                          defaultChecked={getValues("selectedSkills")?.includes(skill)}
                          {...register("selectedSkills", {
                            validate: (value) =>
                              value?.length > 0 || "Please select at least one skill.",
                          })}
                          onChange={(e) => {
                            const value = e.target.value;
                            const selected = getValues("selectedSkills") || [];
                            const updated = selected.includes(value)
                              ? selected.filter((s) => s !== value)
                              : [...selected, value];
                            setValue("selectedSkills", updated, {
                              shouldValidate: true,
                            });
                          }}
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                        />
                      </ListItemPrefix>
                      <Typography className="font-medium text-gray-300">
                        {skill}
                      </Typography>
                    </label>
                  </ListItem>
                ))}
              </List>
              {errors.selectedSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedSkills.message}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Available Days</label>
                <Controller
                  name="availableDays"
                  control={control}
                  rules={{ required: "Please select at least one day." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={daysOptions}
                      placeholder="Select available days..."
                      className="text-gray-900"
                    />
                  )}
                />
                {errors.availableDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableDays.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Available Time</label>
                <Controller
                  name="availableTime"
                  control={control}
                  rules={{ required: "Please select an available time." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={timesOptions}
                      placeholder="Select available time..."
                      className="text-gray-900"
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

            {/* Age and Experience */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Age</label>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  {...register("age", {
                    required: "Age is required.",
                    min: { value: 18, message: "You must be at least 18 years old." },
                  })}
                  className="text-gray-300"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Years of Experience</label>
                <Input
                  type="number"
                  placeholder="Enter your experience"
                  {...register("experience", {
                    required: "Experience is required.",
                    min: { value: 0, message: "Please enter a valid number." },
                  })}
                  className="text-gray-300"
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
                rows={5}
                placeholder="Tell us a bit about yourself..."
                {...register("biography", {
                  required: "Biography is required.",
                  minLength: {
                    value: 10,
                    message: "Biography should be at least 10 characters long.",
                  },
                })}
                className="text-gray-300"
              />
              {errors.biography && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.biography.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button color="orange" type="submit" fullWidth>
              Submit Application
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BeTrainer;
