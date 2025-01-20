import { Card, Button, Avatar, Typography } from "@material-tailwind/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../components/shared/LodingSpinner";
import { Helmet } from "react-helmet-async";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebook className="text-orange-500" />,
    url: "https://www.facebook.com",
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="text-orange-500" />,
    url: "https://www.instagram.com",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="text-orange-500" />,
    url: "https://www.linkedin.com",
  },
];

const AllTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axiosPublic("/trainers?status=Verified");
      return response.data;
    },
  });
  console.log(trainers);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Helmet>
        <title>FitTrack - Meet Our Trainers </title>
        <meta
          name="description"
          content="Meet our experienced fitness trainers who will help you achieve your fitness goals"
        />
      </Helmet>
      <section className="py-12 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            className="text-center mb-12 font-bold text-orange-700"
          >
            Meet Our Trainers
          </Typography>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {trainers?.length > 0 ? (
              trainers?.map((trainer = {}) => (
                <motion.div
                  key={trainer._id}
                  variants={cardVariants}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 ring ring-orange-900 bg-black shadow-lg  text-white flex flex-col items-center">
                    <Avatar
                      src={trainer.profileImage}
                      alt={trainer.fullName}
                      size="xl"
                      className="mb-4"
                    />
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="mb-2 font-semibold text-center text-gray-200"
                    >
                      {trainer.fullName}
                    </Typography>
                    <Typography className="text-gray-400 text-sm text-center mb-4">
                      {trainer.experience} Years Of Experience
                    </Typography>
                    <div className="flex gap-3 text-xl">
                      {socialLinks.map(({ icon, url }, idx) => (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={idx}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                    <Button
                      color="orange"
                      variant="filled"
                      className="mt-4"
                      onClick={() => navigate(`/trainer/${trainer._id}`)}
                    >
                      Know More
                    </Button>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-center col-span-full text-2xl"
              >
                No Trainers Found
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AllTrainer;
