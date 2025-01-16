import React from "react";
import { motion } from "framer-motion";
import { FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const CommunityPosts = () => {
  // Dummy data for community posts
  const posts = [
    {
      id: 1,
      title: "Top 5 Fitness Myths Debunked",
      description: "Learn the truth about common fitness myths and how to avoid them.",
      link: "#",
      date: "January 15, 2025",
    },
    {
      id: 2,
      title: "How to Stay Consistent with Your Workouts",
      description: "Discover practical tips to build and maintain a workout routine.",
      link: "#",
      date: "January 12, 2025",
    },
    {
      id: 3,
      title: "Benefits of Group Exercise Classes",
      description: "Find out how group workouts can boost your motivation and performance.",
      link: "#",
      date: "January 10, 2025",
    },
    {
      id: 4,
      title: "Nutrition Tips for Weight Loss",
      description: "Explore simple yet effective dietary tips to help you lose weight sustainably.",
      link: "#",
      date: "January 8, 2025",
    },
    {
      id: 5,
      title: "5 Yoga Poses to Improve Flexibility",
      description: "Try these yoga poses to enhance your flexibility and reduce muscle tension.",
      link: "#",
      date: "January 6, 2025",
    },
    {
      id: 6,
      title: "The Importance of Rest Days",
      description: "Understand why taking rest days is crucial for optimal fitness results.",
      link: "#",
      date: "January 4, 2025",
    },
  ];

  return (
    <section className="py-10">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-8">
          Latest Community Posts
        </h2>
        <Typography variant="lead" className="text-gray-400 max-w-screen-sm mx-auto text-center mb-10">
            Discover the latest community posts and discussions related to fitness, nutrition, and wellness.
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <motion.div
              key={post.id}
              className="ring ring-orange-900/60 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * post.id, duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <FaRegNewspaper className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 mb-4">{post.description}</p>
              <p className="text-sm text-gray-500 mb-4">{post.date}</p>
              <Link
                to={post.link}
                className="text-blue-600 hover:underline font-medium"
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityPosts;
