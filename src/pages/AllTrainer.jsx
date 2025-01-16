import { Card, Button, Avatar, Typography } from "@material-tailwind/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const trainers = [
  {
    id: 1,
    name: "John Doe",
    experience: "10+ Years",
    availableSlots: "5 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    experience: "8 Years",
    availableSlots: "3 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Mike Johnson",
    experience: "5 Years",
    availableSlots: "7 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Sarah Lee",
    experience: "6 Years",
    availableSlots: "4 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "Chris Evans",
    experience: "12 Years",
    availableSlots: "2 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Emily Carter",
    experience: "9 Years",
    availableSlots: "6 Slots",
    photo: "https://via.placeholder.com/150",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

const AllTrainer = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 ">
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
          {trainers.map((trainer) => (
            <Card
              key={trainer.id}
              className="p-6 ring ring-orange-900 bg-black shadow-lg  text-white flex flex-col items-center"
            >
              <Avatar
                src={trainer.photo}
                alt={trainer.name}
                size="xl"
                className="mb-4"
              />
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-semibold text-center text-gray-200"
              >
                {trainer.name}
              </Typography>
              <Typography className="text-gray-400 text-sm text-center mb-4">
                {trainer.experience} Experience
              </Typography>
              <Typography className="text-orange-600 text-sm mb-4">
                {trainer.availableSlots}
              </Typography>
              <div className="flex justify-center space-x-4 mb-4">
                <a href={trainer.social.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-orange-600 text-xl hover:text-orange-700 transition" />
                </a>
                <a href={trainer.social.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-orange-600 text-xl hover:text-orange-700 transition" />
                </a>
                <a href={trainer.social.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-orange-600 text-xl hover:text-orange-700 transition" />
                </a>
                <a href={trainer.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-orange-600 text-xl hover:text-orange-700 transition" />
                </a>
              </div>
              <Button
                color="orange"
                variant="filled"
                className="mt-4"
                onClick={() => navigate(`/trainer/${trainer.id}`)}
              >
                Know More
              </Button>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AllTrainer;
