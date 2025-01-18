
import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";

const CommunityPosts = () => {
  const axiosPublic = useAxiosPublic();
  const { data:posts=[], isLoading, isError } = useQuery({
    queryKey: ["featured-posts"],
    queryFn: async () => {
      const response = await axiosPublic("/featured-posts");
      return response.data;
    }
  });
  console.log(posts);
 

  return (
    <section className="py-10">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-4">
          Latest Community Posts
        </h2>
        <Typography variant="lead" className="text-gray-400 max-w-screen-sm mx-auto text-center mb-10">
            Discover the latest community posts and discussions related to fitness, nutrition, and wellness.
        </Typography>
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
               
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityPosts;
