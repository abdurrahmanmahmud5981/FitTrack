import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import { FaCloudUploadAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import uploadImage, { saveUser } from "../../api/uploadImage";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { signInWithGoogle, createUser, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  console.log(imagePreview);
  // Image upload handlers
  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const photoURL = await uploadImage(file);
    console.log(photoURL);
    setImagePreview(photoURL);
    // setValue('photo', imagePreview);
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("photo", null);
  };

  //  console.log(imagePreview);
  const showSuccessAlert = () => {
    Swal.fire({
      title: "Registration Successful!",
      text: "Welcome to our fitness community!",
      icon: "success",
      confirmButtonText: "Continue",
      confirmButtonColor: "#2196f3",
    }).then(() => {
      // navigate("/dashboard"); // or wherever you want to redirect
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      title: "Registration Failed",
      text: error || "Please try again later",
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#ef4444",
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (imagePreview === null) {
        Swal.fire({
          title: "Image Required",
          text: "Please upload a profile picture",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#ef4444",
        });
        return;
      }
      const result = await createUser(data?.email, data?.password);
      await updateUserProfile(data?.name, imagePreview);
      await saveUser(result.user);
      navigate("/");
      reset();
      showSuccessAlert();
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      const user = await signInWithGoogle();
      console.log(user.user);
      // save user information in the database if he is new
      await saveUser(user?.user);
      navigate("/");
      showSuccessAlert();
    } catch (error) {
      showErrorAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl bg-orange-50  backdrop-blur-3xl filter backdrop-filter">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Create Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={inputVariants} className="space-y-4">
              <div className="flex flex-col items-center">
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
                      className="w-24 h-24  rounded-full object-cover border-4 border-orange-500"
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
                    className="w-24 h-24  border-4 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    <FaCloudUploadAlt size={30} className="text-gray-400" />
                    <span className="text-sm text-gray-400 mt-2">
                      Upload Photo
                    </span>
                  </label>
                )}
                {errors.photo && (
                  <Typography color="red" className="mt-1 text-sm">
                    {errors.photo.message}
                  </Typography>
                )}
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <Input
                size="lg"
                label="Full Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography color="red" className="mt-1 text-sm">
                  {errors.name.message}
                </Typography>
              )}
            </motion.div>

            <motion.div variants={inputVariants}>
              <Input
                size="lg"
                label="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography color="red" className="mt-1 text-sm">
                  {errors.email.message}
                </Typography>
              )}
            </motion.div>

            <motion.div variants={inputVariants}>
              <div className="relative ">
                <Input
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one special character, and one number",
                    },
                  })}
                  error={!!errors.password}
                  className="pr-10 "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2  right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <Typography color="red" className="mt-1 text-sm">
                  {errors.password.message}
                </Typography>
              )}
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                <FcGoogle />
                Continue with Google
              </Button>
            </motion.div>
          </div>

          <Typography color="gray" className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Login here
            </a>
          </Typography>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
