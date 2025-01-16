import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiUsers, FiCalendar, FiAward } from "react-icons/fi";

const dummyClasses = [
  {
    id: 1,
    title: "Yoga & Meditation",
    description: "Find inner peace and physical harmony through our comprehensive yoga sessions combining traditional practices with modern wellness techniques.",
    duration: "60 mins",
    capacity: "20 students",
    level: "All Levels",
    schedule: "Mon, Wed, Fri",
    trainers: [
      { name: "John Doe", photo: "https://via.placeholder.com/80", id: 1, certification: "RYT-500" },
      { name: "Jane Smith", photo: "https://via.placeholder.com/80", id: 2, certification: "E-RYT 200" },
      { name: "Mike Johnson", photo: "https://via.placeholder.com/80", id: 3, certification: "RYT-200" }
    ],
  },
  {
    id: 2,
    title: "High-Intensity Cardio",
    description: "Transform your fitness with scientifically designed cardio workouts that maximize calorie burn and improve cardiovascular health.",
    duration: "45 mins",
    capacity: "15 students",
    level: "Intermediate",
    schedule: "Tue, Thu, Sat",
    trainers: [
      { name: "Emma Brown", photo: "https://via.placeholder.com/80", id: 4, certification: "NASM-CPT" },
      { name: "David Wilson", photo: "https://via.placeholder.com/80", id: 5, certification: "ACE-CPT" }
    ],
  },
  // Add more classes as needed...
];

const AllClasses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;
  const navigate = useNavigate();

  // Pagination Logic
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = dummyClasses.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(dummyClasses.length / classesPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography variant="h1" color="blue-gray" className="mb-3">
            Fitness Classes
          </Typography>
          <Typography variant="lead" color="gray" className="opacity-80">
            Discover our expert-led classes designed for every fitness level
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentClasses.map((classData) => (
            <motion.div key={classData.id} variants={cardVariants}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardBody className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Typography variant="h4" color="blue-gray" className="font-bold">
                      {classData.title}
                    </Typography>
                    <span className="bg-blue-gray-50 text-blue-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {classData.level}
                    </span>
                  </div>

                  <Typography className="text-gray-600 mb-6">
                    {classData.description}
                  </Typography>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <FiClock className="mr-2" />
                      <Typography variant="small">{classData.duration}</Typography>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiUsers className="mr-2" />
                      <Typography variant="small">{classData.capacity}</Typography>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiCalendar className="mr-2" />
                      <Typography variant="small">{classData.schedule}</Typography>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiAward className="mr-2" />
                      <Typography variant="h6" color="blue-gray">
                        Class Trainers
                      </Typography>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {classData.trainers.slice(0, 5).map((trainer) => (
                        <motion.div
                          key={trainer.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Avatar
                            src={trainer.photo}
                            alt={trainer.name}
                            size="md"
                            className="cursor-pointer border-2 border-white hover:border-blue-500 transition-colors"
                            onClick={() => navigate(`/trainer/${trainer.id}`)}
                            title={`${trainer.name} - ${trainer.certification}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <IconButton
                key={page}
                variant={currentPage === page ? "filled" : "outlined"}
                color="blue-gray"
                onClick={() => setCurrentPage(page)}
                className="rounded-full"
              >
                {page}
              </IconButton>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllClasses;