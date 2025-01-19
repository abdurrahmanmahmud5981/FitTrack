import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Rating,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import LoadingSpinner from "../shared/LodingSpinner";

const TestimonialsCarousel = () => {
  const axiosPublic = useAxiosPublic();
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await axiosPublic("/reviews");
      return response.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <section className="py-10">
      <div>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4 text-orange-700">
            What Our Members Say
          </Typography>
          <Typography
            variant="lead"
            className="max-w-2xl mx-auto text-gray-400"
          >
            Real experiences from our dedicated members who have transformed
            their lives through our fitness programs
          </Typography>
        </div>

        <div className="relative lg:px-14 ">
          {/* Custom Navigation Buttons */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 swiper-button-prev">
            {/* <FaChevronLeft className=" text-gray-600" /> */}
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 swiper-button-next">
            {/* <FaChevronRight className=" text-gray-600" /> */}
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials?.map((review) => (
              <SwiperSlide key={review._id}>
                <Card className="h-full bg-transparent border text-white ">
                  <CardHeader className="bg-transparent mt-5 text-white shadow-none">
                    <div className="flex items-center mb-4">
                      <Avatar
                        size="lg"
                        variant="circular"
                        src={review?.userImage}
                        alt={review?.userName}
                        className="mr-4"
                      />
                      <div>
                        <Typography variant="h6">{review?.userName}</Typography>
                        <Typography variant="small" className="font-normal">
                          {review?.packageName} Member
                        </Typography>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Rating value={review.rating} readonly />
                    </div>
                  </CardHeader>
                  <CardBody className="flex-grow pb-0">
                    <Typography className="mb-4 font-normal block flex-grow">
                      {review?.feedback}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <div className="flex  justify-between ">
                      <Typography variant="small">
                        Program: {review?.className}
                      </Typography>
                      <Typography variant="small">
                        {new Date(review?.date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination mt-8" />
        </div>
      </div>

      {/* Swiper Custom Styles */}
      <style>{`
        .testimonials-swiper {
          padding-bottom: 3rem;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: 'orange';
          width: 16px;
          border-radius: 4px;
        }
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
