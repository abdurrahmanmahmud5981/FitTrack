import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import  Swal  from 'sweetalert2';


const Newsletter = () => {
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   try {
    const result =  await axiosPublic.post('/subscribers', data)
    if(result.data?.insertedId){
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully subscribed to our newsletter!',
        icon:'success',
        confirmButtonText: 'Cool'
      })
      reset();
    }else{
      Swal.fire({
        title: 'Oops!',
        text: `${result.data.message}`,
        icon: 'error',
        confirmButtonText: 'Thanks'
      })
      reset()
    }
   } catch (error) {
    console.error("Error subscribing user:", error);
    
    Swal.fire({
      title: 'Error!',
      text: `${error.message}`,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    
   }
  };

  return (
    <section className="py-16 bg-gradient-to-tr from-orange-100 via-orange-500 to-orange-900 text-white rounded-xl">
      <motion.div
        className="container mx-auto px-6 lg:px-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-2xl mx-auto bg-white text-gray-800 shadow-lg">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Subscribe to Our Newsletter
          </Typography>
          <Typography className="text-gray-600 mb-6">
            Join our fitness community to get the latest updates, tips, and
            exclusive offers directly to your inbox.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                type="text"
                label="Your Name"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
              />
              {errors.name && (
                <Typography variant="small" className="text-red-500 mt-1">
                  {errors.name.message}
                </Typography>
              )}
            </div>
            <div>
              <Input
                type="email"
                label="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={errors.email?.message}
              />
              {errors.email && (
                <Typography variant="small" className="text-red-500 mt-1">
                  {errors.email.message}
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              fullWidth
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white"
            >
              Subscribe Now
            </Button>
          </form>
        </Card>
      </motion.div>
    </section>
  );
};

export default Newsletter;
