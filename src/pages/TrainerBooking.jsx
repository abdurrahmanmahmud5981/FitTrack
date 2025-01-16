import { useState } from 'react';
import { Card, Button, Typography, Radio } from "@material-tailwind/react";
import { 
  FaClock, 
  FaDumbbell, 
  FaCheck, 
  FaArrowRight, 
  FaCrown,
  FaRegStar,
  FaStar 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TrainerBooking = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Mock data - replace with actual data from your backend
  const bookingDetails = {
    trainer: {
      name: "John Doe",
      expertise: "Strength Training",
      image: "https://via.placeholder.com/150",
    },
    selectedSlot: "Monday 9:00 AM - 10:00 AM",
    classes: ["Yoga", "CrossFit", "Cardio"],
  };

  const packages = [
    {
      id: "basic",
      name: "Basic Membership",
      price: 10,
      icon: <FaRegStar className="text-4xl text-orange-500" />,
      benefits: [
        "Access to gym facilities during regular hours",
        "Use of cardio and strength training equipment",
        "Access to locker rooms and showers",
      ],
    },
    {
      id: "standard",
      name: "Standard Membership",
      price: 50,
      icon: <FaStar className="text-4xl text-orange-500" />,
      benefits: [
        "All benefits of Basic Membership",
        "Access to group fitness classes",
        "Use of additional amenities like sauna",
      ],
    },
    {
      id: "premium",
      name: "Premium Membership",
      price: 100,
      icon: <FaCrown className="text-4xl text-orange-500" />,
      benefits: [
        "All benefits of Standard Membership",
        "Personal training sessions",
        "Discounts on additional services",
      ],
    },
  ];

  const handleJoinNow = () => {
    if (!selectedPackage) {
      alert("Please select a package to continue");
      return;
    }
    navigate(`/payment`, { 
      state: { 
        trainer: bookingDetails.trainer,
        slot: bookingDetails.selectedSlot,
        package: packages.find(pkg => pkg.id === selectedPackage)
      } 
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Trainer Info & Selected Slot */}
          <Card className="mb-8 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img 
                src={bookingDetails.trainer.image} 
                alt={bookingDetails.trainer.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                  {bookingDetails.trainer.name}
                </Typography>
                <Typography color="gray" className="mb-4">
                  {bookingDetails.trainer.expertise}
                </Typography>
                <div className="flex items-center gap-2 mb-4">
                  <FaClock className="text-orange-500" />
                  <Typography>{bookingDetails.selectedSlot}</Typography>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.classes.map((className, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Membership Packages */}
          <Typography variant="h4" color="blue-gray" className="mb-6">
            Select Your Membership Package
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`p-6 cursor-pointer ${
                    selectedPackage === pkg.id 
                      ? 'ring-2 ring-orange-500' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <Typography variant="h5" color="blue-gray" className="mb-1">
                        {pkg.name}
                      </Typography>
                      <Typography variant="h4" color="orange" className="font-bold">
                        ${pkg.price}
                      </Typography>
                    </div>
                    {pkg.icon}
                  </div>
                  
                  <Radio
                    name="package"
                    color="orange"
                    checked={selectedPackage === pkg.id}
                    onChange={() => setSelectedPackage(pkg.id)}
                    className=""
                  />
                  
                  <ul className="space-y-3">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-orange-500 mt-1" />
                        <Typography className="text-gray-700">
                          {benefit}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Join Now Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              color="orange"
              className="flex items-center gap-2"
              onClick={handleJoinNow}
              disabled={!selectedPackage}
            >
              Join Now
              <FaArrowRight />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainerBooking;