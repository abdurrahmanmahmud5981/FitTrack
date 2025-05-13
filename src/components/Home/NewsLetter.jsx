import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/subscribers", data);

      if (res.data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully subscribed to our newsletter!",
          icon: "success",
          confirmButtonText: "Great!",
          background: "#1a1a1a",
          color: "#fff",
        });
        reset();
      } else {
        Swal.fire({
          title: "Oops!",
          text: res.data?.message || "Subscription failed.",
          icon: "error",
          confirmButtonText: "Okay",
          background: "#1a1a1a",
          color: "#fff",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        background: "#1a1a1a",
        color: "#fff",
      });
    }
  };

  return (
    <motion.section
      className="py-16 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 rounded-xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div variants={cardVariants}>
          <Card className="p-8 max-w-2xl mx-auto bg-gray-900 shadow-xl border border-gray-800">
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Typography variant="h3" className="text-orange-500 mb-2">
                  Subscribe to Our Newsletter
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography className="text-gray-400 mb-6">
                  Join our fitness community to get the latest updates, tips, and
                  exclusive offers directly to your inbox.
                </Typography>
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    type="text"
                    label="Your Name"
                    color="orange"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    aria-invalid={errors.name ? "true" : "false"}
                    className="text-gray-300"
                    labelProps={{ className: "!text-gray-400" }}
                  />
                  {errors.name && (
                    <Typography
                      variant="small"
                      className="text-red-500 mt-1 pl-1"
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    type="email"
                    label="Your Email"
                    color="orange"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    error={!!errors.email}
                    aria-invalid={errors.email ? "true" : "false"}
                    className="text-gray-300"
                    labelProps={{ className: "!text-gray-400" }}
                  />
                  {errors.email && (
                    <Typography
                      variant="small"
                      className="text-red-500 mt-1 pl-1"
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Subscribe Now
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
