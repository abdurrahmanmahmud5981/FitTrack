import { useQuery } from "react-query";
import { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,

  Avatar,
  CardFooter,
} from "@material-tailwind/react";

import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
const Community = () => {
  const axiosPublic = useAxiosPublic();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["forumPosts", currentPage],
    async () => {
      const response = await axiosPublic(
        `/forum-posts?page=${currentPage}&limit=6`
      );
      return response.data;
    },
    { keepPreviousData: true }
  );

  const handleVote = async (id, type) => {
  
    }
  

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading posts</Typography>;

  const { posts = [], totalPages } = data || {};

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="">
        <div className="text-center mb-10">
          <Typography variant="h2" className="text-orange-600 mb-4">
            Forum Discussions
          </Typography>
          <Typography className="text-gray-300">
            Share your thoughts and engage with the community.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map(
            ({
              _id,
              title,
              content,
              votes,
              author,
              date,
              role,
              authorImage,
            }) => (
              <Card
                key={_id}
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              >
                <CardBody className="flex-grow pb-0">
                  <div className="flex items-center mb-5">
                    <Avatar className="mr-4" src={authorImage} alt={author} />
                    <div>
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-200"
                      >
                        {author}
                      </Typography>
                      <Typography className="text-sm text-gray-400">
                        {role}
                      </Typography>
                      <Typography className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    variant="h5"
                    className="text-2xl font-semibold text-gray-100 mb-3"
                  >
                    {title}
                  </Typography>
                  <Typography className="text-gray-400 mb-5">
                    {content}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <Typography  className="flex items-center gap-2 bg-orange-500 font-bold text-white px-4 rounded-full"><FaRegArrowAltCircleUp/>: {votes?.upvotes}</Typography>
                      <span className="flex items-center gap-2 bg-red-800 font-bold text-white px-4 rounded-full"><FaRegArrowAltCircleDown/>: {votes?.downvotes}</span>
                    
                      
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleVote(_id, "up")}
                        size="small"
                        variant="gradient"
                        color="deep-orange"
                      >
                        Upvote
                      </Button>
                      <Button
                        onClick={() => handleVote(_id, "down")}
                        size="small"
                        variant="outlined"
                        color="red"
                        className="hover:bg-red-500 transition-colors duration-200 hover:text-white"
                      >
                        Downvote
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            )
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Previous
          </Button>
          <Typography variant="h6" className="mx-4 text-orange-600">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;
