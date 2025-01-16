
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import image from '../../assets/hero_slider_bg_3.png';
const AboutSection = () => {
  return (
    <motion.section
      className="py-10 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-14">About FitTrack</h2>
      <div className=" grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 order-2 md:order-1">
          <p className="text-gray-400">
            At FitTrack, we are committed to helping individuals achieve their
            fitness goals in a supportive and empowering environment. With
            state-of-the-art facilities, expert trainers, and a wide range of
            programs, we are your go-to destination for health and wellness.
          </p>
          <p className="text-gray-400">
            Founded with the belief that fitness is for everyone, we strive to
            create a community where every member feels welcome, motivated, and
            inspired. Whether you&apos;re here to lose weight, build muscle, or just
            stay active, FitTrack is here to guide you every step of the way.
          </p>
         
           <Button color="deep-orange"  size="md">
                    Learn More
                  </Button>
        </div>

        {/* Right Image/Illustration */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={image}
            alt="About FitTrack"
            className="order-1 md:order-2 w-full object-top rounded-lg shadow-lg h-[400px] object-cover"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
