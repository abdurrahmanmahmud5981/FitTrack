import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaDumbbell,
  FaCalendarAlt,
  FaUsers,
  FaAppleAlt,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
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
      className="relative py-20 px-4 text-white  overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10 bg-center bg-cover pointer-events-none" />

      {/* Heading */}
      <div className="relative text-center mb-16 z-10">
        <h2 className="text-4xl font-extrabold text-orange-600 drop-shadow-md">
          Why Choose FitTrack?
        </h2>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          Discover the key features that make FitTrack your ultimate destination for health and fitness.
        </p>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="rounded-xl ring ring-orange-500/30 bg-white/5 backdrop-blur-md shadow-xl p-6 hover:shadow-orange-400/30 transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white text-center mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-center text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <div className="relative z-10 text-center mt-16">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h3>
        <Link
          to="/register"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
        >
          Join FitTrack Today
        </Link>
      </div>
    </motion.section>
  );
};

export default FeaturedSection;
