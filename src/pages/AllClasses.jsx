import  { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Card, CardHeader, CardBody, Typography, Button, Avatar, Tooltip, CardFooter } from "@material-tailwind/react";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const classesPerPage = 6;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError } = useQuery(
    ["allClasses", currentPage,searchDebounced],
    async () => {
      const response = await axiosPublic(
        `/classes?page=${currentPage}&limit=${classesPerPage}&search=${searchDebounced.trim()}`
      );
      return response.data;
    }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  const skeletonCard = (
    <div className="bg-gray-800 rounded-xl p-4 animate-pulse">
      <div className="h-56 bg-gray-700 rounded-lg mb-4" />
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-700 rounded w-5/6" />
      <div className="mt-4 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-12 rounded-full bg-gray-700" />
        ))}
      </div>
    </div>
  );

  if (isError) {
    return (
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="py-10 text-center"
      >
        <Typography variant="h5" className="text-red-500">
          Unable to load classes. Please try again later.
        </Typography>
      </motion.section>
    );
  }

  const { classes = [], totalPages } = data || {};

  return (
    <section className="py-10 text-white min-h-screen">
      <Helmet>
        <title>All Classes - Discover Your Next Class</title>
        <meta
          name="description"
          content="Browse our wide range of classes and find the perfect one to start your journey. Search, filter, and explore classes with expert trainers."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=""
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h2" className="mb-4 text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Explore Our Classes
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto text-gray-300">
              Find the perfect class for your journey. Use the search bar below to explore and filter your results.
            </Typography>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search for classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-800/50 text-white border border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isLoading && <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Classes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {skeletonCard}
              </motion.div>
            ))}
          </div>
        ) : classes?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {classes.map(({ _id, name, description, image, trainers }) => (
              <motion.div
                key={_id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                  <CardHeader floated={false} className="relative h-56 overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                  </CardHeader>
                  <CardBody className="flex-grow">
                    <Typography variant="h5" className="mb-2 font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {name || "Class Name"}
                    </Typography>
                    <Typography className="text-gray-300">
                      {description || "No description available."}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Typography variant="small" className="mb-2 text-orange-400">
                      Expert Trainers:
                    </Typography>
                    <div className="flex gap-3 flex-wrap">
                      {trainers?.slice(0, 3)?.map((trainer, idx) => (
                        <Link to={`/trainer/${trainer?.trainerId}`} key={idx}>
                          <Tooltip content={trainer?.trainerName}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                              <Avatar
                                size="lg"
                                alt={trainer?.trainerName}
                                src={trainer?.trainerImage}
                                className="ring-2 ring-orange-500/50 hover:ring-4 transition-all duration-300"
                              />
                            </motion.div>
                          </Tooltip>
                        </Link>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <Typography variant="h5" className="text-gray-400">
              No classes found. Please try a different search query.
            </Typography>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center mt-10 gap-4"
          >
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outlined"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Previous
            </Button>
            <Typography variant="h6" className="font-bold text-orange-500">
              {currentPage} / {totalPages}
            </Typography>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outlined"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Next
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AllClasses;