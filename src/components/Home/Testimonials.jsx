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

const TestimonialsCarousel = () => {
  // Enhanced reviews data with more details
  const reviews = [
    {
      id: 1,
      name: "Sarah Wilson",
      date: "2024-01-10",
      rating: 5,
      review:
        "The trainers here are exceptional! I've seen incredible progress in my fitness journey. The personalized attention and motivation keep me coming back.",
      image: "/api/placeholder/150/150",
      membershipType: "Premium Member",
      programAttended: "HIIT Training",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "2024-01-12",
      rating: 5,
      review:
        "Best fitness decision I've made! The variety of classes and professional guidance have transformed my workout routine completely.",
      image: "/api/placeholder/150/150",
      membershipType: "Standard Member",
      programAttended: "Strength Training",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 3,
      name: "Emma Thompson",
      date: "2024-01-15",
      rating: 4,
      review:
        "Great community atmosphere and top-notch equipment. The trainers really know how to push you to achieve your goals.",
      image: "/api/placeholder/150/150",
      membershipType: "Premium Member",
      programAttended: "Yoga Flow",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 4,
      name: "James Rodriguez",
      date: "2024-01-18",
      rating: 5,
      review:
        "The personal attention to form and technique is outstanding. I've never felt stronger or more confident in my fitness journey.",
      image: "/api/placeholder/150/150",
      membershipType: "Standard Member",
      programAttended: "CrossFit",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 5,
      name: "Lisa Chang",
      date: "2024-01-20",
      rating: 5,
      review:
        "Incredible transformation in just a few months! The trainers are knowledgeable and the community is so supportive.",
      image: "/api/placeholder/150/150",
      membershipType: "Premium Member",
      programAttended: "Body Pump",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 6,
      name: "David Miller",
      date: "2024-01-22",
      rating: 4,
      review:
        "The variety of classes keeps things interesting and challenging. Love the positive environment and expert guidance.",
      image: "/api/placeholder/150/150",
      membershipType: "Standard Member",
      programAttended: "Cardio Kickboxing",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 7,
      name: "Sarah Wilson",
      date: "2024-01-10",
      rating: 5,
      review:
        "The trainers here are exceptional! I've seen incredible progress in my fitness journey. The personalized attention and motivation keep me coming back.",
      image: "/api/placeholder/150/150",
      membershipType: "Premium Member",
      programAttended: "HIIT Training",
      weightLoss: "15kg",
      memberSince: "2023-06-15",
      achievements: [
        "5K Run",
        "Perfect Attendance",
        "Monthly Challenge Winner",
      ],
      favoriteClass: "Morning HIIT",
    },
    {
      id: 8,
      name: "Michael Chen",
      date: "2024-01-12",
      rating: 5,
      review:
        "Best fitness decision I've made! The variety of classes and professional guidance have transformed my workout routine completely.",
      image: "/api/placeholder/150/150",
      membershipType: "Standard Member",
      programAttended: "Strength Training",
      weightLoss: "8kg",
      memberSince: "2023-09-01",
      achievements: ["Deadlift PR", "Consistency Award"],
      favoriteClass: "Power Lifting",
    },
    {
      id: 9,
      name: "Emma Thompson",
      date: "2024-01-15",
      rating: 4,
      review:
        "Great community atmosphere and top-notch equipment. The trainers really know how to push you to achieve your goals.",
      image: "/api/placeholder/150/150",
      membershipType: "Premium Member",
      programAttended: "Yoga Flow",
      weightLoss: "5kg",
      memberSince: "2023-04-20",
      achievements: ["Flexibility Master", "30-Day Challenge"],
      favoriteClass: "Morning Yoga",
    },
    // ... (previous reviews remain the same)
  ];

  return (
    <section className="py-10">
      <div className="">
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4 text-orange-700">
            What Our Members Say
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-gray-400">
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
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Card className="h-full bg-transparent border text-white">
                  <CardHeader className="bg-transparent mt-10 text-white">
                    <div className="flex items-center mb-4">
                      <Avatar
                        size="lg"
                        variant="circular"
                        src={review.image}
                        alt={review.name}
                        className="mr-4"
                      />
                      <div>
                        <Typography variant="h6">{review.name}</Typography>
                        <Typography variant="small" className="font-normal">
                          {review.membershipType}
                        </Typography>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Rating value={review.rating} readonly />
                    </div>
                  </CardHeader>
                  <CardBody className="flex-grow">
                    <Typography className="mb-4 font-normal block flex-grow">
                      {review.review}
                    </Typography>
                  </CardBody>
                  <CardFooter>
                    <div className="flex items-center justify-between ">
                      <Typography variant="small">
                        Program: {review.programAttended}
                      </Typography>
                      <Typography variant="small">
                        {new Date(review.date).toLocaleDateString()}
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
