import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaEye, FaEyeSlash, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import uploadImage, { saveUser } from "../../api/uploadImage";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { signInWithGoogle, createUser, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();


  const showAlert = (title, text, icon, confirmButtonColor = "#ea580c") => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
      confirmButtonColor,
      background: "#1f2937",
      color: "#f3f4f6",
      toast: true,
      position: "center",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      showAlert(
        "Invalid File Type",
        "Please upload a valid image file (JPEG, PNG, or GIF)",
        "error"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert(
        "File Too Large",
        "Please upload an image smaller than 5MB",
        "error"
      );
      return;
    }

    setIsImageUploading(true);
    try {
      const photoURL = await uploadImage(file);
      setImagePreview(photoURL);
      showAlert(
        "Success",
        "Profile picture uploaded successfully",
        "success"
      );
    } catch (error) {
      showAlert(
        "Upload Failed",
        "Failed to upload image. Please try again.",
        "error"
      );
    } finally {
      setIsImageUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (isLoading || isSubmitting) return;
    
    if (!imagePreview) {
      showAlert(
        "Profile Picture Required",
        "Please upload a profile picture to continue",
        "warning"
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await createUser(data?.email, data?.password);
      await updateUserProfile(data?.name, imagePreview);
      await saveUser(result.user);
      
      showAlert(
        "Registration Successful!",
        "Welcome to our community!",
        "success"
      );
      
      navigate("/");
      reset();
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please try logging in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      }
      
      showAlert(
        "Registration Failed",
        errorMessage,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;
    
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      await saveUser(user?.user);
      
      showAlert(
        "Google Sign-In Successful!",
        "Welcome to our community!",
        "success"
      );
      
      navigate("/");
    } catch (error) {
      let errorMessage = "Google sign-in failed. Please try again.";
      
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in window was closed. Please try again.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Pop-up was blocked. Please allow pop-ups and try again.";
      }
      
      showAlert(
        "Google Sign-In Failed",
        errorMessage,
        "error"
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("photo", null);
    showAlert(
      "Image Removed",
      "Profile picture has been removed",
      "info"
    );
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

  const LoadingSpinner = ({ size = 20 }) => (
    <FaSpinner className="animate-spin" size={size} />
  );

  return (
    <div className=" py-14  min-h-screen flex items-center justify-center px-4 bg-gray-950">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-gray-900 border-gray-800">
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={inputVariants} className="space-y-4">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isImageUploading}
                />

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={isLoading || isImageUploading}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-gray-100 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="photo"
                    className={`w-24 h-24 rounded-full border-4 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors ${
                      isImageUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isImageUploading ? (
                      <LoadingSpinner size={30} />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={30} className="text-gray-400" />
                        <span className="text-sm text-gray-400 mt-2">
                          Upload Photo
                        </span>
                      </>
                    )}
                  </label>
                )}
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.photo.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Full Name"
                  disabled={isLoading}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Email"
                  disabled={isLoading}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </motion.div>

           <motion.div variants={inputVariants}>
              <div className="relative ">
                <input
                 type={showPassword ? "text" : "password"}
                 name="password"
                 className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-gray-100"
                 placeholder="Password"
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
                
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
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
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isLoading || isImageUploading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div
              variants={inputVariants}
              whileHover={{ scale: isGoogleLoading ? 1 : 1.02 }}
              whileTap={{ scale: isGoogleLoading ? 1 : 0.98 }}
              className="mt-6"
            >
              <Button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGoogleLoading || isLoading}
              >
                {isGoogleLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <FcGoogle size={20} />
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Login here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;