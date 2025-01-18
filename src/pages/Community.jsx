import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { Button, Typography, Card, CardBody, Chip, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["forumPosts", currentPage],
    async () => {
      const response = await axiosPublic(`/forum-posts?page=${currentPage}&limit=6`);
      return response.data;
    },
    { keepPreviousData: true }
  );

  const handleVote = async (id, type) => {
    const endpoint = type === "up" ? `/forum-posts/${id}/up-vote` : `/forum-posts/${id}/down-vote`;
    try {
      await axiosPublic.post(endpoint);
      queryClient.invalidateQueries("forumPosts"); // Refetch data after voting
    } catch (error) {
      console.error("Failed to vote:", error.response?.data?.message);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading posts</Typography>;

  const { posts = [], totalPages } = data || {};

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Typography variant="h2" className="text-orange-600 mb-4">
            Forum Discussions
          </Typography>
          <Typography className="text-gray-300">
            Share your thoughts and engage with the community.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ _id, title, content, votes, author, date, role,authorImage }) => (
            <Card key={_id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <CardBody>
                <div className="flex items-center mb-5">
                  <Avatar className="mr-4" src={authorImage} alt={author} />
                  <div>
                    <Typography variant="h6" className="font-semibold text-gray-200">{author}</Typography>
                    <Typography className="text-sm text-gray-400">{role}</Typography>
                    <Typography className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</Typography>
                  </div>
                </div>

                <Typography variant="h5" className="text-2xl font-semibold text-gray-100 mb-3">{title}</Typography>
                <Typography className="text-gray-400 mb-5">{content}</Typography>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Chip value={`Up: ${votes?.upvotes}`} color="green" className="mr-2 text-gray-100" />
                    <Chip value={`Down: ${votes?.downvotes}`} color="red" className="text-gray-100" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleVote(_id, "up")}
                      size="small"
                      variant="outlined"
                      color="green"
                      className="hover:bg-green-500 hover:text-white transition duration-200"
                    >
                      Upvote
                    </Button>
                    <Button
                      onClick={() => handleVote(_id, "down")}
                      size="small"
                      variant="outlined"
                      color="red"
                      className="hover:bg-red-500 hover:text-white transition duration-200"
                    >
                      Downvote
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
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
