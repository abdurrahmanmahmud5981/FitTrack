import  { useState } from 'react';
import { useQuery } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Typography, Card, CardBody, Avatar, CardFooter } from "@material-tailwind/react";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const Community = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery(
    ["forumPosts", currentPage],
    async () => {
      const response = await axiosPublic(`/forum-posts?page=${currentPage}&limit=6`);
      return response.data;
    },
    { 
      keepPreviousData: true,
      staleTime: 5000 
    }
  );

  const { posts = [], totalPages } = data || {};
  const handleVote = async (id, type) => {
    try {
      const response = await axiosPublic.patch(`/forum-posts/${id}`, { type });
      if (response.status === 200) {
        await refetch();
        Swal.fire({
          title: "Vote submitted successfully!",
          text: `Your ${type === 'up' ? 'upvote' : 'downvote'} has been recorded.`,
          icon: "success",
          confirmButtonText: "Okay",
          confirmButtonColor: '#f97316', // orange-500
          background: '#1f2937', // gray-800
          color: '#fff'
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to register vote. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: '#f97316', // orange-500
        background: '#1f2937', // gray-800
        color: '#fff'
      });
    }
  };

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

  console.log(posts);

  const SkeletonPost = () => (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 animate-pulse">
      <div className="flex items-center mb-5">
        <div className="w-12 h-12 bg-gray-700 rounded-full mr-4" />
        <div>
          <div className="h-4 bg-gray-700 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-700 rounded w-20" />
        </div>
      </div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-700 rounded w-5/6" />
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-8 bg-gray-700 rounded w-20" />
        <div className="h-8 bg-gray-700 rounded w-20" />
      </div>
    </div>
  );

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center text-red-500"
      >
        <Typography variant="h5">
          Unable to load forum posts. Please try again later.
        </Typography>
      </motion.div>
    );
  }

  return (
   <>
   <Helmet>
     <title>FitTrack - Community</title>
     <meta name="description" content="Discover and engage with our vibrant fitness community, share your thoughts and connect with fellow enthusiasts." />

     
   </Helmet>
    <section className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Typography variant="h2" className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Forum Discussions
          </Typography>
          <Typography className="text-gray-300 max-w-2xl mx-auto">
            Share your thoughts and engage with our vibrant community. Join the conversation and connect with fellow fitness enthusiasts.
          </Typography>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkeletonPost />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {posts.map(({
                _id,
                title,
                content,
                votes,
                author,
                date,
                role,
                authorImage,
              }) => (
                <motion.div
                  key={_id}
                  variants={itemVariants}
                  layout
                  className="h-full"
                >
                  <Card className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                    <CardBody className="flex-grow">
                      <motion.div 
                        className="flex items-center mb-5"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Avatar
                          src={authorImage}
                          alt={author}
                          className="ring-2 ring-orange-500/30 mr-4 transition-all duration-300"
                        />
                        <div>
                          <Typography className="font-semibold text-gray-200">
                            {author}
                          </Typography>
                          <Typography className="text-sm text-orange-500">
                            {role}
                          </Typography>
                          <Typography className="text-xs text-gray-400">
                            {new Date(date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </div>
                      </motion.div>

                      <Typography variant="h5" className="text-xl font-semibold text-gray-100 mb-3">
                        {title}
                      </Typography>
                      <Typography className="text-gray-300 mb-5">
                        {content}
                      </Typography>
                    </CardBody>

                    <CardFooter className="pt-0">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 font-bold text-white px-4 py-1 rounded-full"
                          >
                            <FaRegArrowAltCircleUp className="text-lg" />
                            <span>{votes?.upvotes}</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-800 font-bold text-white px-4 py-1 rounded-full"
                          >
                            <FaRegArrowAltCircleDown className="text-lg" />
                            <span>{votes?.downvotes}</span>
                          </motion.div>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => handleVote(_id, "up")}
                              variant="outline"
                              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none hover:opacity-90"
                            >
                              Upvote
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => handleVote(_id, "down")}
                              variant="outline"
                              className="border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all duration-300"
                            >
                              Downvote
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center mt-10 gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                variant="outlined"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Previous
              </Button>
            </motion.div>
            
            <Typography variant="h6" className="font-bold text-orange-500">
              {currentPage} / {totalPages}
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                variant="outlined"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Next
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
   </>
  );
};

export default Community;