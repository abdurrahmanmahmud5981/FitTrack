import { useState } from "react";
import { motion } from "framer-motion";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  FaUserEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaClock,
  FaUser,
  FaCloudUploadAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import uploadImage from "../api/uploadImage";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure(`/users/${user?.email}`);
      return response.data;
    },
  });

  const { name, image, email, role, _id } = userInfo;
  const [imagePreview, setImagePreview] = useState(image);
  const [userName, setUserName] = useState(name);

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    console.log(photoURL);
    setImagePreview(photoURL);
  };
  const removeImage = () => {
    setImagePreview(null);
  };
  const handleUpdate = async () => {
    try {
      const profileInfo = {
        name: userName,
        image: imagePreview,
      };
      const res = await axiosSecure.patch(`/users/${_id}`, profileInfo);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    } finally {
      setIsUpdateModalOpen(false);
      refetch();
    }
  };
  console.log(imagePreview);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-4"
    >
      <Card className="shadow-lg">
        <CardBody>
          {/* Profile Display Section */}
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="relative">
              <Badge
                content={`${role}`}
                withBorder
                placement="bottom-end"
                className="-translate-x-0 -mb-1 px-3 w-full"
                color="deep-orange"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
              </Badge>
            </div>

            {/* User Information */}
            <div className="text-center space-y-2">
              <Typography variant="h4" color="blue-gray">
                {name || "User Name"}
              </Typography>

              <div className="flex items-center justify-center gap-2">
                <FaEnvelope className="text-blue-gray-400" />
                <Typography color="blue-gray">
                  {email || "email@example.com"}
                </Typography>
              </div>

              <div className="flex items-center justify-center gap-2">
                <FaClock className="text-blue-gray-400" />
                <Typography color="blue-gray" className="text-sm">
                  Last login:{" "}
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleString()
                    : "Not Available"}
                </Typography>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <FaUserEdit className="h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Update Profile Modal */}
      <Dialog
        size="md"
        open={isUpdateModalOpen}
        handler={() => setIsUpdateModalOpen(false)}
      >
        <DialogHeader>Update Profile</DialogHeader>
        <DialogBody divider className="space-y-4">
          {/* Name Update */}
          <div className="space-y-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Display Name
            </Typography>
            <Input
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              icon={<FaUser />}
              className="!outline-none border-none ring-orange-900 ring focus:border focus:!border-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Profile Picture Update */}
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <Typography variant="h5" color="blu-gray" className="font-medium">
                Profile Picture
              </Typography>
              <input
                type="file"
                id="photo"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-44 h-44  rounded-full object-cover border-4 border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="photo"
                  className="w-40 h-24  border-4 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                >
                  <FaCloudUploadAlt size={30} className="text-gray-400" />
                  <span className="text-sm text-gray-400 mt-2">
                    Upload Photo
                  </span>
                </label>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            onClick={() => setIsUpdateModalOpen(false)}
            className="flex items-center gap-2"
          >
            <FaTimes className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            color="green"
            onClick={handleUpdate}
            className="flex items-center gap-2"
          >
            <FaSave className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </motion.div>
  );
};

export default UserProfile;
