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
import useAuth from "../../hooks/useAuth";
import uploadImage from "../../api/uploadImage";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { daysOptions, timesOptions } from "../../api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Skill Options
const skillsOptions = [
  "Yoga",
  "Zumba",
  "Pilates",
  "Strength Training",
  "Cardio",
  "Body Combat",
];

const BeTrainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = await uploadImage(file);
      if (photoURL) setProfileImage(photoURL);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!profileImage) {
      return Swal.fire({
        title: "Missing Image",
        text: "Please upload a profile image before submitting.",
        icon: "error",
      });
    }

    const trainerData = {
      ...data,
      fullName: user?.displayName,
      profileImage,
      availableDays: data.availableDays.map((d) => d.value),
      availableTime: data.availableTime.value,
      status: "Pending",
    };

    try {
      const response = await axiosSecure.post("/trainers", trainerData);
      if (response.data?.insertedId) {
        Swal.fire({
          title: "Application Submitted",
          text: "Your application has been successfully submitted.",
          icon: "success",
        });
        navigate("/dashboard/activity-log");
      } else {
        Swal.fire({
          title: "Submission Failed",
          text: response.data?.message || "Something went wrong.",
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Server Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-16 px-4">
      <Helmet>
        <title>FitTrack - Become a Trainer</title>
        <meta name="description" content="Apply to become a professional trainer at FitTrack." />
        <meta property="og:title" content="FitTrack - Become a Trainer" />
        <meta property="og:description" content="Submit your credentials to become a certified trainer at FitTrack." />
      </Helmet>

      <Card className="shadow-lg bg-transparent text-white ring ring-gray-800">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-6">Trainer Application Form</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={user?.displayName} readOnly className="text-gray-400 cursor-not-allowed" />
              <Input label="Email" value={user?.email} readOnly className="text-gray-400 cursor-not-allowed" />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block mb-2 font-medium">Profile Image</label>
              <div className="flex items-center gap-3">
                <label htmlFor="profileImage" className="cursor-pointer px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-2">
                  <FiUpload size={18} /> Upload
                </label>
                <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              {profileImage && (
                <div className="relative mt-3">
                  <img src={profileImage} alt="Profile" className="w-32 h-32 object-cover rounded-md border" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
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
              <List className="grid sm:grid-cols-2 gap-4">
                {skillsOptions.map((skill) => (
                  <ListItem key={skill} className="p-0">
                    <label htmlFor={skill} className="flex w-full items-center cursor-pointer px-3 py-2">
                      <ListItemPrefix>
                        <Checkbox
                          id={skill}
                          value={skill}
                          {...register("selectedSkills", {
                            validate: (value) =>
                              (value?.length > 0) || "Please select at least one skill.",
                          })}
                          defaultChecked={getValues("selectedSkills")?.includes(skill)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const current = getValues("selectedSkills") || [];
                            const updated = current.includes(value)
                              ? current.filter((s) => s !== value)
                              : [...current, value];
                            setValue("selectedSkills", updated, { shouldValidate: true });
                          }}
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{ className: "p-0" }}
                        />
                      </ListItemPrefix>
                      <Typography className="text-gray-300">{skill}</Typography>
                    </label>
                  </ListItem>
                ))}
              </List>
              {errors.selectedSkills && (
                <p className="text-red-500 text-sm mt-1">{errors.selectedSkills.message}</p>
              )}
            </div>

            {/* Schedule */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Available Days</label>
                <Controller
                  name="availableDays"
                  control={control}
                  rules={{ required: "Please select available days." }}
                  render={({ field }) => (
                    <Select {...field} isMulti options={daysOptions} placeholder="Select days..." className="text-gray-900" />
                  )}
                />
                {errors.availableDays && (
                  <p className="text-red-500 text-sm mt-1">{errors.availableDays.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Available Time</label>
                <Controller
                  name="availableTime"
                  control={control}
                  rules={{ required: "Please select available time." }}
                  render={({ field }) => (
                    <Select {...field} options={timesOptions} placeholder="Select time..." className="text-gray-900" />
                  )}
                />
                {errors.availableTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.availableTime.message}</p>
                )}
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Age"
                placeholder="Enter your age"
                {...register("age", {
                  required: "Age is required.",
                  min: { value: 18, message: "Minimum age is 18." },
                })}
                className="text-gray-300"
              />
              <Input
                type="number"
                label="Experience (Years)"
                placeholder="Years of experience"
                {...register("experience", {
                  required: "Experience is required.",
                  min: { value: 0, message: "Must be 0 or more." },
                })}
                className="text-gray-300"
              />
            </div>
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}

            {/* Biography */}
            <div>
              <label className="block mb-2 font-medium">Biography</label>
              <Textarea
                rows={5}
                placeholder="Write a brief biography..."
                {...register("biography", {
                  required: "Biography is required.",
                  minLength: { value: 10, message: "At least 10 characters." },
                })}
                className="text-gray-300"
              />
              {errors.biography && (
                <p className="text-red-500 text-sm mt-1">{errors.biography.message}</p>
              )}
            </div>

            {/* Submit */}
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
