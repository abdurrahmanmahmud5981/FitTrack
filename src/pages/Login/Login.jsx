import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../api/uploadImage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithGoogle, signIn } = useAuth();
  const navigate = useNavigate();
  const location  = useLocation();
  const from = location.state?.from.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Handle login logic here
      await signIn(data?.email, data?.password);
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2196f3",
      })
      navigate(from);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Please try again later",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      const user = await signInWithGoogle();
   
      // save user information in the database if he is new
      await saveUser(user?.user);
      navigate(from || "/");

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2196f3",
      });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Please try again later",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl bg-orange-50 backdrop-blur-3xl">
          <Typography variant="h4" className="mb-4 text-center font-bold">
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <motion.div variants={inputVariants}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-orange-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div variants={inputVariants} className="mt-6">
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

          <Typography className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Register here
            </Link>
          </Typography>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
