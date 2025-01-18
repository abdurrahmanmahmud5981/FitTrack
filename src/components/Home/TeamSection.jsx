import { motion } from "framer-motion";
import {
  Card,
  Typography,
  Avatar,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { FaDumbbell, FaRunning, FaBiking } from "react-icons/fa";
const trainers = [
  {
    name: "John Doe",
    bio: "Certified trainer with 10+ years of experience in strength training and bodybuilding.",
    expertise: ["Strength Training", "Bodybuilding", "Nutrition"],
    photo:
      "https://img.freepik.com/free-photo/handsome-man-with-glasses_144627-18665.jpg",
    icon: <FaDumbbell className="text-orange-500 text-2xl" />,
  },

  {
    name: "Mike Johnson",
    bio: "Running coach focused on endurance building and marathon preparation.",
    expertise: ["Running", "Marathons", "Endurance"],
    photo:
      "https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg",
    icon: <FaRunning className="text-orange-500 text-2xl" />,
  },
  {
    name: "Chris Evans",
    bio: "Cycling coach helping clients achieve peak performance on and off-road.",
    expertise: ["Cycling", "Cardio", "Strength"],
    photo:
      "https://img.freepik.com/free-photo/portrait-smiling-young-man-looking-camera_23-2148148708.jpg",
    icon: <FaBiking className="text-orange-500 text-2xl" />,
  },
];

const TeamSection = () => {
  return (
    <section className="py-16  text-white">
      <motion.div
        className=""
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <Card
              key={index}
              className="bg-gradient-to-tr from-black via-gray-900 to-orange-900/60"
            >
              <CardHeader className="bg-transparent shadow-none mx-auto">
                <Avatar
                  src={trainer.photo}
                  alt={trainer.name}
                  size="xl"
                  className="mb-4"
                />
              </CardHeader>
              <CardBody className="flex flex-col items-center pb-0">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-2 font-semibold text-orange-400"
                >
                  {trainer.name}
                </Typography>
                <Typography className="text-gray-400 mb-4 text-center">
                  {trainer.bio}
                </Typography>
              </CardBody>
              <CardFooter clssName="pt-0">
                <div className="flex flex-col items-center">
                  <div className="mb-2">{trainer.icon}</div>
                  <Typography
                    variant="h6"
                    className="text-gray-300 font-medium mb-1"
                  >
                    Expertise
                  </Typography>
                  <ul className="list-disc list-inside text-gray-400">
                    {trainer.expertise.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
