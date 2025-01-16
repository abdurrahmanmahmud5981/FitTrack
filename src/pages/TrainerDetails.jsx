import { Card, Button, Typography, Avatar, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
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
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TrainerDetails = () => {
  const navigate = useNavigate();

  const trainer = {
    name: "John Doe",
    photo: "https://via.placeholder.com/400",
    title: "Senior Fitness Specialist",
    rating: 4.9,
    reviewCount: 128,
    details: "John is a certified fitness trainer with over 10 years of experience in personal training, group classes, and specialized fitness programs. He has helped countless individuals achieve their fitness goals through tailored workout plans and nutritional guidance.",
    certifications: ["NASM Certified", "ACE Personal Trainer", "Nutrition Specialist"],
    expertise: ["Strength Training", "Cardio Workouts", "Weight Management"],
    availableSlots: [
      "Monday 9:00 AM - 10:00 AM",
      "Wednesday 3:00 PM - 4:00 PM",
      "Friday 6:00 PM - 7:00 PM",
    ],
    achievements: [
      "Helped 500+ clients achieve their fitness goals",
      "Featured in Fitness Magazine",
      "Award-winning transformation specialist"
    ]
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-orange-50 to-orange-100 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <motion.div 
              className="w-full md:w-1/3"
              {...fadeIn}
            >
              <Card className="p-4">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-600 text-lg" />
                    <Typography color="blue-gray" className="font-semibold">
                      {trainer.rating}
                    </Typography>
                    <Typography color="gray" className="text-sm">
                      ({trainer.reviewCount} reviews)
                    </Typography>
                  </div>
                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    Top Rated
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Trainer Info Section */}
            <motion.div 
              className="w-full md:w-2/3"
              {...fadeIn}
            >
              <div className="flex flex-col gap-6">
                <div>
                  <Typography variant="h2" color="blue-gray" className="font-bold">
                    {trainer.name}
                  </Typography>
                  <Typography color="gray" className="text-lg">
                    {trainer.title}
                  </Typography>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outlined" 
                    color="orange" 
                    className="flex items-center gap-2"
                  >
                    <FaEnvelope className="text-lg" />
                    Message
                  </Button>
                  <Button 
                    color="orange" 
                    className="flex items-center gap-2"
                  >
                    <FaCalendarAlt className="text-lg" />
                    Book Session
                  </Button>
                </div>

                <Card className="p-6">
                  <Typography className="text-gray-700">
                    {trainer.details}
                  </Typography>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div 
        className="container mx-auto px-4 py-12"
        {...fadeIn}
      >
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
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-4">
                      Areas of Expertise
                    </Typography>
                    <div className="space-y-4">
                      {trainer.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {skill === "Strength Training" && <FaDumbbell className="text-orange-600 text-xl" />}
                          {skill === "Cardio Workouts" && <FaRunning className="text-orange-600 text-xl" />}
                          {skill === "Weight Management" && <FaHeart className="text-orange-600 text-xl" />}
                          <Typography>{skill}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div>
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
                  </div>
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="schedule">
              <Card className="p-6">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Available Time Slots
                </Typography>
                <div className="space-y-4">
                  {trainer.availableSlots.map((slot, index) => (
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
                        onClick={()=>navigate(`/bookTrainer/${slot.split(' ')[0]}`)}
                      >
                        Book
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="achievements">
              <Card className="p-6">
                <div className="space-y-6">
                  {trainer.achievements.map((achievement, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheckCircle className="text-orange-600 text-xl mt-1" />
                      <Typography>{achievement}</Typography>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="container mx-auto px-4 py-12"
        {...fadeIn}
      >
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <Typography variant="h4" color="white" className="mb-2">
                Join Our Team of Expert Trainers
              </Typography>
              <Typography color="white" opacity={0.8}>
                Share your passion for fitness and help others achieve their goals
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