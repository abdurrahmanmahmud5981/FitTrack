import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Typography,  Button } from "@material-tailwind/react";
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
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const handleCradentials = (role)=>{

    let credentials = null;

  if (role === "admin") {
    credentials = {
      email: "admin@example.com",
      password: "admin@exampleA!1",
    };
  } else if (role === "member") {
    credentials = {
      email: "member@example.com",
      password: "member@exampleA!1",
    };
  } else if (role === "trainer") {
    credentials = {
      email: "trainer@example.com",
      password: "trainer@exampleA!1",
    };
  }
if (credentials) {
    setValue("email", credentials.email);
    setValue("password", credentials.password);
  }
   }
 
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
      const user = await signIn(data?.email, data?.password);
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2196f3",
      });
      // save user information in the database if he is new
      await saveUser(user?.user);
      navigate(from);
    } catch (error) {
      console.error(error);
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950 mb-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-lg min-h-screen mt-10"
      >
        <Card className="p-8 bg-gray-900 border-gray-800 backdrop-blur-3xl py-16">
          <Typography
            variant="h4"
            className=" font-bold text-orange-500 text-center mb-8"
          >
            Welcome Back
          </Typography>
         <div className="flex gap-4 items-center justify-between my-6 flex-wrap">
         <Button onClick={()=>handleCradentials("admin")} color="amber" className="flex-1">Admin </Button>
         <Button onClick={()=>handleCradentials("member")}  color="amber" className="flex-1">Member</Button>
         <Button onClick={()=>handleCradentials("trainer")}  color="amber" className="flex-1">Trainer</Button>
         </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={inputVariants}>
              <input
                type="email"
                name="email"
             
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-gray-100"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Typography color="red" className="mt-1 text-sm">
                  {errors.email.message}
                </Typography>
              )}
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
            <motion.div variants={inputVariants}>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.div variants={inputVariants} className="mt-6">
              <Button
                onClick={handleGoogleLogin}
                aria-label="Sign in with Google"
                className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-gray-700"
                disabled={isLoading}
              >
                <FcGoogle />
                Continue with Google
              </Button>
            </motion.div>
          </div>

          <Typography className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-400 transition-colors"
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
