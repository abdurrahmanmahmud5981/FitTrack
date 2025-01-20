/* eslint-disable react/prop-types */

import { ScaleLoader } from 'react-spinners'
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg'
const LoadingSpinner = ({ smallHeight=0 }) => 
  {
    const loadingContainerVariants = {
      start: {
        transition: {
          staggerChildren: 0.2,
        },
      },
      end: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
  
    const loadingCircleVariants = {
      start: {
        y: "0%",
      },
      end: {
        y: "100%",
      },
    };
  
    const loadingCircleTransition = {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    };
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
       <div className="flex justify-center items-center min-h-screen">
        <motion.div
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
          className="flex gap-2"
        >
          {[1, 2, 3].map((_, i) => (
            <motion.img
              key={i}
              src={logo}
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
              className="w-5 h-5 bg-gray-900 rounded-full"
            />
            
          ))}
        </motion.div>
      </div>
    </div>
  )
}



export default LoadingSpinner