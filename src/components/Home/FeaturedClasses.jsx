import { useQuery } from "react-query";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: featuredClasses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const response = await axiosPublic("/featured-classes");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-10 text-center">
        <Typography variant="h5" className="text-gray-500">
          Loading featured classes...
        </Typography>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 text-center">
        <Typography variant="h5" className="text-red-500">
          Unable to load featured classes. Please try again later.
        </Typography>
      </section>
    );
  }

  return (
    <section className="py-10 text-white">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Typography variant="h2" className="mb-4 text-3xl text-orange-700">
            Most Popular Classes
          </Typography>
          <Typography
            variant="lead"
            className="max-w-2xl mx-auto text-gray-400"
          >
            Join our most booked classes led by expert trainers and elevate your
            skills to the next level.
          </Typography>
        </div>

        {/* Featured Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredClasses.map(
            ({ _id, name, image, description, totalBookings }) => (
              <Card
                key={_id}
                className="text-white overflow-hidden bg-transparent border border-orange-900/70 hover:shadow-lg transition-shadow"
              >
                {/* Card Header with Image */}
                <CardHeader
                  floated={false}
                  className="relative h-56 bg-transparent border"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Chip
                      value={`${totalBookings.toLocaleString()} bookings`}
                      color="deep-orange"
                      className="!text-[10px] rounded-full"
                      size="small"
                    />
                  </div>
                </CardHeader>

                {/* Card Body */}
                <CardBody className="flex-grow pb-3">
                  <Typography variant="h5" className="mb-2">
                    {name}
                  </Typography>
                  <Typography className="text-gray-500">
                    {description}
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

export default FeaturedClasses;
