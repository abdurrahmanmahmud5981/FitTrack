import { motion } from "framer-motion";
// Importing icons from React Icons
import { FaChalkboardTeacher, FaDumbbell, FaCalendarAlt, FaUsers, FaAppleAlt, FaClock } from "react-icons/fa";

const FeaturedSection = () => {
  // Featured Items Data
  const features = [
    {
      id: 1,
      title: "Expert Trainers",
      description:
        "Work with certified trainers who tailor programs to your goals.",
      icon: <FaChalkboardTeacher className="text-4xl text-blue-700" />,
    },
    {
      id: 2,
      title: "State-of-the-Art Equipment",
      description:
        "Access the latest fitness technology and equipment for optimal workouts.",
      icon: <FaDumbbell className="text-4xl text-green-600" />,
    },
    {
      id: 3,
      title: "Flexible Memberships",
      description:
        "Choose from a range of plans designed to fit your schedule and budget.",
      icon: <FaCalendarAlt className="text-4xl text-purple-600" />,
    },
    {
      id: 4,
      title: "Group Classes",
      description:
        "Enjoy energizing group classes like yoga, Zumba, and HIIT.",
      icon: <FaUsers className="text-4xl text-orange-500" />,
    },
    {
      id: 5,
      title: "Nutrition Guidance",
      description:
        "Get expert advice on meal planning and nutrition to support your fitness journey.",
      icon: <FaAppleAlt className="text-4xl text-red-600" />,
    },
    {
      id: 6,
      title: "24/7 Access",
      description: "Work out anytime with our round-the-clock gym access.",
      icon: <FaClock className="text-4xl text-teal-500" />,
    },
  ];

  return (
    <motion.section
      className="py-10   text-white "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-10 text-orange-700">Why Choose FitTrack?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="rounded-lg ring shadow p-6  transition-all ring-orange-500/50 bg-orange-50/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold  mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedSection;
