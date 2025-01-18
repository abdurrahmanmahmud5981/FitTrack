import {
  Card,
  Button,
  Typography,
  Avatar,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  FaDumbbell,
  FaHeart,
  FaRunning,
  FaClock,
  FaMedal,
  FaCalendarAlt,
  FaEnvelope,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
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
  console.log(trainerId);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: trainer = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axiosPublic(`/trainers/${trainerId}`);
      return response.data;
    },
  });
  console.log(trainer);
  if (isLoading) return <LoadingSpinner />;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
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
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  className="w-full h-96 object-cover object-top rounded-lg "
                />
               <div className="flex gap-3 text-xl mt-4 items-center">
                    <span className="text-orange-500 font-semibold">Social Links:</span>
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
                    {trainer.fullName}
                  </Typography>
                  <Typography className="text text-gray-400">
                    {trainer.experience} Years Of Experience
                  </Typography>
                </div>

                <div className="">
                  <Typography variant="h5" color="white">
                    Bio:
                  </Typography>
                <Typography className="text-gray-400">
                  {trainer.biography}
                </Typography>
                </div>
                <div className="">
                  <Typography variant="h5" color="white">
                   Experties:
                  </Typography>
                
                  <div className="flex flex-col gap-3 mt-2">
                    {trainer?.selectedSkills?.map((day, index) => (
                      <p key={index} className=" px-4 py-2 bg-gray-700 text-white uppercase text-xs font-semibold w-fit rounded-full">
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
                    {trainer.availableDays.map((day, index) => (
                      <p key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm w-fit">
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

      {/* Tabs Section */}
      <motion.div className="container mx-auto px-4 py-12" {...fadeIn}>
        <Tabs value="expertise" className="w-full">
          <TabsHeader>
            <Tab value="expertise">Expertise</Tab>
            <Tab value="schedule">Schedule</Tab>
            <Tab value="achievements">Achievements</Tab>
          </TabsHeader>

          <TabsBody>
            <TabPanel value="expertise">
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Expertise Section */}
                  {/* <div>
                    <Typography variant="h5" color="blue-gray" className="mb-4">
                      Areas of Expertise
                    </Typography>
                    <div className="space-y-4">
                      {trainer.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {skill === "Strength Training" && (
                            <FaDumbbell className="text-orange-600 text-xl" />
                          )}
                          {skill === "Cardio Workouts" && (
                            <FaRunning className="text-orange-600 text-xl" />
                          )}
                          {skill === "Weight Management" && (
                            <FaHeart className="text-orange-600 text-xl" />
                          )}
                          <Typography>{skill}</Typography>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Certifications Section */}
                  {/* <div>
                    <Typography variant="h5" color="blue-gray" className="mb-4">
                      Certifications
                    </Typography>
                    <div className="space-y-4">
                      {trainer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <FaMedal className="text-orange-600 text-xl" />
                          <Typography>{cert}</Typography>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="schedule">
              <Card className="p-6">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Available Time Slots
                </Typography>
                <div className="space-y-4">
                  {/* {trainer.availableSlots.map((slot, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <FaClock className="text-orange-600 text-xl" />
                        <Typography>{slot}</Typography>
                      </div>
                      <Button
                        variant="outlined"
                        color="orange"
                        size="sm"
                        onClick={() =>
                          navigate(`/bookTrainer/${slot.split(" ")[0]}`)
                        }
                      >
                        Book
                      </Button>
                    </motion.div>
                  ))} */}
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="achievements">
              <Card className="p-6">
                <div className="space-y-6">
                  {/* {trainer.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheckCircle className="text-orange-600 text-xl mt-1" />
                      <Typography>{achievement}</Typography>
                    </motion.div>
                  ))} */}
                </div>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
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
