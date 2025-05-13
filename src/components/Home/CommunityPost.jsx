import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LodingSpinner";

const CommunityPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["featured-posts"],
    queryFn: async () => {
      const response = await axiosPublic("/featured-posts");
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <section className="py-10 text-center">
        <Typography variant="h5" className="text-red-500">
          Failed to load community posts. Please try again later.
        </Typography>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div >
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-4">
          Latest Community Posts
        </h2>
        <Typography
          variant="lead"
          className="text-gray-400 max-w-screen-md mx-auto text-center mb-10"
        >
          Discover the latest community discussions around fitness, nutrition,
          and wellness.
        </Typography>

        {posts.length === 0 ? (
          <Typography className="text-center text-gray-500">
            No posts available at the moment.
          </Typography>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(
              ({
                _id,
                title,
                content,
                author,
                date,
                role,
                authorImage,
                link,
              }) => (
                <Card
                  key={_id}
                  className="bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <CardBody className="pb-0">
                    <div className="flex items-center mb-4">
                      <Avatar
                        className="mr-4"
                        src={authorImage}
                        alt={author}
                      />
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
                      className="text-xl font-semibold text-gray-100 mb-3"
                    >
                      {title}
                    </Typography>
                    <Typography className="text-gray-400 mb-6 line-clamp-4">
                      {content.slice(0, 50)}...  
                    </Typography>
                  </CardBody>

                  <CardFooter className="pt-0 pb-4 px-6">
                    <Link to={link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" color="orange">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityPosts;
