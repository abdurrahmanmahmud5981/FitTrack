import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import image from "../../assets/hero_slider_bg_3.png";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <motion.section
      className="py-20 px-4 text-white bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-orange-600 drop-shadow-md">
          About FitTrack
        </h2>
        <p className="mt-2 text-gray-400 max-w-xl mx-auto text-sm">
          More than just a gym – we’re a community built to elevate every journey.
        </p>
      </div>

      {/* Grid Layout: Text & Image */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Text Content */}
        <motion.div
          className="space-y-6 order-2 md:order-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 leading-relaxed">
            At <strong className="text-orange-500">FitTrack</strong>, we are committed to helping individuals achieve their fitness goals
            in a supportive and empowering environment. From expert trainers to cutting-edge
            equipment, we’re your trusted partner in health and wellness.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We believe fitness should be inclusive, inspiring, and tailored to you. Whether you’re here
            to lose weight, build strength, or simply feel better – FitTrack is with you every step
            of the way.
          </p>

          {/* CTA Button */}
          <Link to="/allClasses">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="flex justify-center order-1 md:order-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={image}
            alt="About FitTrack"
            className="w-full h-[400px] object-cover object-top rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
