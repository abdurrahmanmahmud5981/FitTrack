import { Card, Button, Avatar, Typography } from "@material-tailwind/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../components/shared/LodingSpinner";

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
  if (isLoading) return <LoadingSpinner />;
  return (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {trainers?.length > 0
            ? trainers?.map((trainer = {}) => (
                <Card
                  key={trainer._id}
                  className="p-6 ring ring-orange-900 bg-black shadow-lg  text-white flex flex-col items-center"
                >
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
              ))
            : <div className="text-white text-center col-span-full text-2xl">No Trainers Found</div>}
        </div>
      </motion.div>
    </section>
  );
};

export default AllTrainer;
