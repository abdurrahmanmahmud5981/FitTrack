import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Radio,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {
  FaClock,
  FaCheck,
  FaArrowRight,
  FaCrown,
  FaRegStar,
  FaStar,
  FaClipboardCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/shared/LodingSpinner";
import { Helmet } from "react-helmet-async";

const TrainerBooking = () => {
  
  const { slotId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { data: slot = {}, isLoading } = useQuery({
    queryKey: ["slot", slotId],
    queryFn: async () => {
      const response = await axiosSecure(`/single-slot/${slotId}`);
      return response.data;
    },
  });
  console.log(slot);

  if (isLoading) return <LoadingSpinner/>
  
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
    const state = {
        trainer:slot?.trainerName,
        trainerEmail: slot?.trainerEmail,
        className: slot?.class,
        days: slot?.days,
        slotName: slot?.slotName,
        packageName: selectedPackage,
        price: packages.find((pkg) => pkg.id === selectedPackage).price,
       
    };
    console.log(state);
    navigate(`/slot-payment`, {
      state:state
    });
  };

  return (
    <section className="min-h-screen  py-12">
      <Helmet>
        <title>Book a Slot - {slot?.trainerName}</title>
        <meta name="description" content="Book a slot with your favorite fitness trainer" />
      </Helmet>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Trainer Info & Selected Slot */}
          <Card className="mb-8 p-6 max-w-screen-md mx-auto bg-transparent ring ring-gray-600 text-white bg-black">
            <div className="">
              <div className="flex flex-col justify-center text-center  items-center">
                <Typography variant="h3" className="mb-2">
                  Trainer:{" "}
                  <span className="text-orange-500"> {slot?.trainerName}</span>
                </Typography>
                <Typography className="mb-4 px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  Class Name: {slot?.class}
                </Typography>
                <Typography className="mb-4 text-gray-400">
                  Slot Name: {slot?.slotName}
                </Typography>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 mb-4">
                    <FaClipboardCheck className="text-orange-500" />
                    <Typography className="capitalize">
                      {slot?.days} ,
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <FaClock className="text-orange-500" />
                    <Typography>{slot?.slotName}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Membership Packages */}
          <Typography variant="h3" color="orange" className="mt-20 mb-12 text-center">
            Select Your Membership Package
          </Typography>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
             
                <Card
                key={pkg?.id}
                  className={`p-6  bg-transparent border border-gray-800 cursor-pointer ${
                    selectedPackage === pkg.id
                      ? "ring-2 ring-orange-500"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <CardHeader className="bg-transparent shadow-none mt-3">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <Typography variant="h5" className="mb-1 text-gray-100">
                          {pkg.name}
                        </Typography>
                        <Typography
                          variant="h4"
                          color="orange"
                          className="font-bold"
                        >
                          ${pkg.price}
                        </Typography>
                      </div>
                      {pkg.icon}
                    </div>
                  </CardHeader>
                  <CardBody className="py-0 ">
                    <Radio
                      name="package"
                      color="orange"
                      checked={selectedPackage === pkg.id}
                      onChange={() => setSelectedPackage(pkg.id)}
                      className=""
                    />
                  </CardBody>
                  <CardFooter className="">
                    <ul className="space-y-3">
                      {pkg.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <FaCheck className="text-orange-500 mt-1" />
                          <Typography className="text-gray-400">
                            {benefit}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </CardFooter>
                </Card>
            
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
