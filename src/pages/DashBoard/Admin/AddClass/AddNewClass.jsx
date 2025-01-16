import { useState } from "react";
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

const AddNewClass = () => {
  const [className, setClassName] = useState("");
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    console.log(className);
    console.log(image);
    console.log(details);
    if (!className || !image || !details) {
        Swal.fire({
            title: "Error",
            text: "Please fill out all required fields!",
            icon: "error",
        })
    //   alert("Please fill out all required fields!");
      return;
    }

    const newClassData = {
      className,
      image, 
      details,
      additionalInfo,
    };

    console.log("New Class Data:", newClassData);
    // Add API/database call here to save the new class
    alert("Class added successfully!");
  };
  console.log(image);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    console.log("Photo URL:", photoURL);
    if (photoURL) {
      setImage(photoURL);
      console.log("Image uploaded successfully:", photoURL);
    }
  };
  // Handle image removal
  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className=" space-y-6">
     

      <Card className="shadow-lg max-w-screen-md mx-auto">
      <CardHeader className="shadow-none mt-10 border-b rounded-none pb-5">
           {/* Header Section */}
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Class Name */}
            <div>
              <label
                htmlFor="className"
                className="block mb-2 font-medium text-gray-700"
              >
                Class Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter class name (e.g., Yoga)"
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Display uploaded image preview */}
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
                htmlFor="classDetails"
                className="block mb-2 font-medium text-gray-700"
              >
                Class Details <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="classDetails"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter details about the class (e.g., duration, difficulty level)"
                rows={5}
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            {/* Additional Info */}
            <div>
              <label
                htmlFor="additionalInfo"
                className="block mb-2 font-medium text-gray-700"
              >
                Additional Info (Optional)
              </label>
              <Input
                id="additionalInfo"
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter any additional information (optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                color="orange"
                onClick={handleSubmit}
                fullWidth
                className="transition-all duration-300 hover:shadow-lg"
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
