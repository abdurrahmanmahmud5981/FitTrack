import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Card,
  CardBody,
  Textarea,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import uploadImage from "../../../../api/uploadImage";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddNewClass = () => {
  const [image, setImage] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.name || !data.image || !data.description) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all required fields!",
        icon: "error",
      });
      return;
    }
    try {
      const response = await axiosSecure.post("/classes", {
        ...data,
        trainers: [],
      });
      if (response.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Class added successfully!",
          icon: "success",
        });
        setImage(null);
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    if (photoURL) {
      setValue("image", photoURL);
      setImage(photoURL);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", null);
    setImage(null);
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>FitTrack Admin - Add New Class</title>
        <meta name="description" content="Add a new class to FitTrack" />
      </Helmet>
      <Card className="shadow-lg max-w-screen-md mx-auto">
        <CardHeader className="shadow-none mt-10 border-b rounded-none pb-5">
          <div className="text-center">
            <Typography variant="h3" color="blue-gray" className="font-bold">
              Add New Class
            </Typography>
            <Typography variant="paragraph" className="text-gray-600 mt-2">
              Use this form to create a new class with all the required details.
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Class Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700"
              >
                Class Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Class Name is required",
                })}
                placeholder="Enter class name (e.g., Yoga)"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="classImage"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md cursor-pointer hover:bg-orange-700 transition-all"
                >
                  <FiUpload size={18} />
                  Upload Image
                </label>
                <input
                  id="classImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md shadow-md border border-gray-200"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                    onClick={handleRemoveImage}
                    type="button"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-40 h-40 bg-gray-100 border border-dashed border-gray-300 rounded-md">
                  <FiImage size={32} className="text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">
                    No image selected
                  </p>
                </div>
              )}
            </div>

            {/* Class Details */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700"
              >
                Class Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Details are required",
                })}
                placeholder="Enter details about the class (e.g., duration, difficulty level)"
                rows={5}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.details.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                color="orange"
                fullWidth
                className="transition-all duration-300 hover:shadow-lg"
                type="submit"
              >
                Add Class
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNewClass;
