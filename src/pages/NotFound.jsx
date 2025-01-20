
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaDumbbell, FaHome, FaHeadset } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
    <Helmet>
        <title>404 | Page Not Found | FitFitFit</title>
        <meta name="description" content="Page not found on FitFitFit" />

    </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* Error Icon and 404 Text */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <BiError className="text-7xl text-orange-500" />
              <h1 className="text-8xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            {/* Animated Dumbbell Icons */}
            <motion.div
              animate={{
                rotate: [0, -20, 20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex justify-center gap-8 mb-8"
            >
              <FaDumbbell size={40} className="text-orange-500 opacity-75" />
              <FaDumbbell size={40} className="text-orange-500" />
              <FaDumbbell size={40} className="text-orange-500 opacity-75" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
              <p className="text-gray-300 max-w-md mx-auto">
                The page you&apos;re looking for seems to be missing. Don&apos;t worry,
                let&apos;s get you back on track to your fitness journey!
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs"
              >
                <Link to="/">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center gap-2 group"
                  >
                    <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                    Return to Homepage
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-gray-400 text-sm"
              >
                <FaHeadset className="text-orange-500" />
                <span>Need assistance?</span>
                <Link
                  to="/"
                  className="text-orange-500 hover:text-orange-400 underline transition-colors duration-300"
                >
                  Contact Support
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full opacity-5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-64 h-64 bg-red-500 rounded-full opacity-5 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
