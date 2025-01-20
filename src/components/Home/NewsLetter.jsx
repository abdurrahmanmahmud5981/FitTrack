import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axiosPublic.post('/subscribers', data);
      if (result.data?.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully subscribed to our newsletter!',
          icon: 'success',
          confirmButtonText: 'Cool',
          background: '#1a1a1a',
          color: '#fff',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        reset();
      } else {
        Swal.fire({
          title: 'Oops!',
          text: `${result.data.message}`,
          icon: 'error',
          confirmButtonText: 'Thanks',
          background: '#1a1a1a',
          color: '#fff'
        });
        reset();
      }
    } catch (error) {
      console.error("Error subscribing user:", error);
      Swal.fire({
        title: 'Error!',
        text: `${error.message}`,
        icon: 'error',
        confirmButtonText: 'Cool',
        background: '#1a1a1a',
        color: '#fff'
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
        <motion.div
          variants={cardVariants}
          className="relative"
        >
          <Card className="p-8 max-w-2xl mx-auto bg-gray-900 shadow-xl border border-gray-800">
            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h3" className="mb-4 text-orange-500">
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
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    type="text"
                    label="Your Name"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                    className=" text-gray-300"
                    labelProps={{
                      className: "!text-gray-400",
                    }}
                    color="orange"
                  />
                  {errors.name && (
                    <Typography variant="small" className="text-red-500 mt-1">
                      {errors.name.message}
                    </Typography>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Input
                    type="email"
                    label="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                    error={errors.email?.message}
                    className=" text-gray-300 "
                    labelProps={{
                      className: "!text-gray-400",
                    }}
                    color="orange"
                  />
                  {errors.email && (
                    <Typography variant="small" className="text-red-500 mt-1">
                      {errors.email.message}
                    </Typography>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    className="bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
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