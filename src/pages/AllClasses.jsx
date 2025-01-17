import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Avatar,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["allClasses", currentPage],
      queryFn: async () => {
        const response = await axiosPublic(
          `/classes?page=${currentPage}&limit=${classesPerPage}`
        );
        return response.data;
      },
    } // Keep previous data while fetching new data
  );

  if (isLoading) {
    return (
      <section className="py-10 text-center">
        <Typography variant="h5" className="text-gray-500">
          Loading classes...
        </Typography>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 text-center">
        <Typography variant="h5" className="text-red-500">
          Unable to load classes. Please try again later.
        </Typography>
      </section>
    );
  }

  const { classes = [], totalPages } = data || {};

  return (
    <section className="py-10 text-white">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Typography variant="h2" className="mb-4 text-3xl text-orange-700">
            All Available Classes
          </Typography>
          <Typography
            variant="lead"
            className="max-w-2xl mx-auto text-gray-400"
          >
            Browse through our extensive range of classes and meet our expert
            trainers.
          </Typography>
        </div>

        {/* All Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {classes.map(({ _id, name, description, image, trainers }) => (
            <Card
              key={_id}
              className="text-white overflow-hidden bg-transparent border border-orange-900/70 hover:shadow-lg transition-shadow"
            >
              {/* Class Image */}
              <CardHeader
                floated={false}
                className="relative h-56 bg-transparent border"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </CardHeader>

              {/* Class Details */}
              <CardBody className=" flex-grow pb-0">
                <Typography variant="h5" className="mb-2">
                  {name || "Not Found"}
                </Typography>
                <Typography className="text-gray-500 mb-4">
                  {description || "Not Found"}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                {/* Trainers */}
                <div>
                  {/* <Typography variant="small" className="mb-2 text-orange-500">
                    Trainers:
                  </Typography> */}
                  <div className="flex gap-3 flex-wrap">
                    {[...Array(8)].slice(0, 5).map((trainer, idx) => (
                      <Link
                        to={`/trainer/${idx}`}
                        key={idx}
                        // className="rounded-full overflow-hidden w-12 h-12 border hover:ring-2 hover:ring-orange-700 transition"
                      >
                        <Tooltip
                          content="Material Tailwind"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <Avatar
                            size="lg"
                            alt="avatar"
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            className="shadow-xl shadow-orange-900/20 ring-4 ring-orange-900/90"
                          />
                        </Tooltip>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mx-2"
            variant="outlined"
            color="orange"
          >
            Previous
          </Button>
          <Typography variant="h6" className="mx-4 text-orange-700">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="mx-2"
            variant="outlined"
            color="orange"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllClasses;
