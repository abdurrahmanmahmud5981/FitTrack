import { Card, Button, Typography } from "@material-tailwind/react";
import {
  FaClock,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "react-query";
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
const TrainerDetails = () => {
  const { trainerId } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const response = await axiosPublic(`/trainers/${trainerId}`);
      return response.data;
    },
  });
  console.log(trainer);
  const { data:slots=[] } = useQuery({
    queryKey: ["slots", trainer?.email],
    enabled: !isLoading && !!trainer?.email,
    queryFn: async () => {
      const response = await axiosPublic(`/slots/${trainer?.email}`);
      console.log(response);
      return response.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      {trainer && (
        <motion.div
          className=" py-12 max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image Section */}
              <motion.div className="w-full lg:w-2/3 " {...fadeIn}>
                <Card className="p-3 bg-transparent ring ring-gray-800">
                  <img
                    src={trainer?.profileImage}
                    alt={trainer?.fullName}
                    className="w-full h-96 object-cover object-top rounded-lg "
                  />
                  <div className="flex gap-3 text-xl mt-4 items-center">
                    <span className="text-orange-500 font-semibold">
                      Social Links:
                    </span>
                    {socialLinks?.map(({ icon, url }, idx) => (
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
                </Card>
              </motion.div>

              {/* Trainer Info Section */}
              <motion.div className="w-full " {...fadeIn}>
                <div className="flex flex-col gap-6">
                  <div>
                    <Typography
                      variant="h2"
                      color="deep-orange"
                      className="font-bold"
                    >
                      {trainer?.fullName}
                    </Typography>
                    <Typography className="text text-gray-400">
                      {trainer?.experience} Years Of Experience
                    </Typography>
                  </div>

                  <div className="">
                    <Typography variant="h5" color="white">
                      Bio:
                    </Typography>
                    <Typography className="text-gray-400">
                      {trainer?.biography}
                    </Typography>
                  </div>
                  <div className="">
                    <Typography variant="h5" color="white">
                      Experties:
                    </Typography>

                    <div className="flex flex-col gap-3 mt-2">
                      {trainer?.selectedSkills?.map((day, index) => (
                        <p
                          key={index}
                          className=" px-4 py-2 bg-gray-700 text-white uppercase text-xs font-semibold w-fit rounded-full"
                        >
                          {day}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <Typography variant="h5" color="white">
                      Available Days:
                    </Typography>
                    <div className="flex flex-col gap-3 mt-2">
                      {trainer &&
                        trainer?.availableDays?.map((day, index) => (
                          <p
                            key={index}
                            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm w-fit"
                          >
                            {day}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Tabs Section */}
      <motion.div className="py-12" {...fadeIn}>
        <Card className="p-6 bg-gray-800 text-white">
          <Typography variant="h5" className="mb-4">
            Available Time Slots
          </Typography>
          <div className="space-y-4">
            {trainer && slots?.length > 0 ?
              slots?.map((slot) => (
                <motion.div
                  key={slot?._id}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg text-gray-800"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <FaClock className="text-orange-600 text-xl" />
                    <Typography className="capitalize">{slot?.slotName}</Typography>
                  </div>
                  <Link to={`/bookTrainer/${slot?._id}`}>
                  <Button
                    variant="outlined"
                    color="orange"
                    size="sm"
                    
                  >
                    Book
                  </Button>
                  </Link>
                </motion.div>
              )):<>
              <p className=" p-4 text-lg font-semibold text-orange-800">No Slot Found!</p>
              </>}
          </div>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div className="container mx-auto px-4 py-12" {...fadeIn}>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Typography variant="h4" color="white" className="mb-2">
                Join Our Team of Expert Trainers
              </Typography>
              <Typography color="white" opacity={0.8}>
                Share your passion for fitness and help others achieve their
                goals
              </Typography>
            </div>
            <Button
              variant="filled"
              color="white"
              className="flex items-center gap-2"
              onClick={() => navigate("/become-a-trainer")}
            >
              Become a Trainer
              <FaArrowRight />
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default TrainerDetails;
