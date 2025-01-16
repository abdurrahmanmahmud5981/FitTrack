import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";

const FeaturedClasses = () => {
  const classes = [
    {
      id: 1,
      title: "Advanced HIIT Training",
      description:
        "High-intensity interval training with expert guidance. Perfect for fat burning and muscle building.",
      totalBookings: 1250,
      image: "/api/placeholder/600/400",
      trainer: "Sarah Johnson",
      duration: "45 mins",
      intensity: "Advanced",
    },
    {
      id: 2,
      title: "Power Yoga Flow",
      description:
        "Dynamic yoga sequences combining strength, flexibility, and mindfulness practices.",
      totalBookings: 1180,
      image: "/api/placeholder/600/400",
      trainer: "Mike Chen",
      duration: "60 mins",
      intensity: "Intermediate",
    },
    {
      id: 3,
      title: "CrossFit Foundations",
      description:
        "Functional movements performed at high intensity to build strength and endurance.",
      totalBookings: 1150,
      image: "/api/placeholder/600/400",
      trainer: "Alex Thompson",
      duration: "50 mins",
      intensity: "Advanced",
    },
    {
      id: 4,
      title: "Strength & Conditioning",
      description:
        "Comprehensive workout focusing on building muscle and improving overall fitness.",
      totalBookings: 1100,
      image: "/api/placeholder/600/400",
      trainer: "David Wilson",
      duration: "55 mins",
      intensity: "Intermediate",
    },
    {
      id: 5,
      title: "Cardio Kickboxing",
      description:
        "High-energy kickboxing class combining martial arts techniques with fast-paced cardio.",
      totalBookings: 1050,
      image: "/api/placeholder/600/400",
      trainer: "Emma Martinez",
      duration: "45 mins",
      intensity: "All Levels",
    },
    {
      id: 6,
      title: "Core & More",
      description:
        "Targeted core strengthening with full-body conditioning for optimal results.",
      totalBookings: 1000,
      image: "/api/placeholder/600/400",
      trainer: "Chris Parker",
      duration: "40 mins",
      intensity: "All Levels",
    },
  ];

  return (
    <section className="py-10 text-white">
      <div className="">
        <div className="text-center mb-16">
          <Typography variant="h2" className="mb-4 text-3xl text-orange-700">
            Most Popular Classes
          </Typography>
          <Typography
            variant="lead"
            className="max-w-2xl mx-auto text-gray-400"
          >
            Join our most booked fitness classes led by expert trainers
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((fitnessClass) => (
            <Card
              key={fitnessClass.id}
              className=" text-white overflow-hidden bg-transparent border border-orange-900/70"
            >
              <CardHeader
                floated={false}
                className="relative h-56 bg-transparent border"
              >
                <img
                  src={fitnessClass.image}
                  alt={fitnessClass.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Chip
                    value={`${fitnessClass.totalBookings.toLocaleString()} bookings`}
                    color="deep-orange"
                    className="text-sm"
                  />
                </div>
              </CardHeader>

              <CardBody className="flex-grow pb-0">
                <div className="mb-3">
                  <Typography variant="h5" className="mb-2">
                    {fitnessClass.title}
                  </Typography>
                  <div className="flex gap-4 mb-4">
                    <Chip
                      className="text-gray-400"
                      size="sm"
                      variant="ghost"
                      value={fitnessClass.duration}
                      icon={<span>⏱️</span>}
                    />
                    <Chip
                      className="text-gray-400"
                      size="sm"
                      variant="ghost"
                      value={fitnessClass.intensity}
                      icon={<span>🎯</span>}
                    />
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Avatar
                    size="sm"
                    variant="circular"
                    className="mr-3"
                    alt={fitnessClass.trainer}
                    src={fitnessClass.trainerImage}
                  ></Avatar>

                  <Typography variant="small">
                    {fitnessClass.trainer}
                  </Typography>
                </div>
                <div className="">{/* {fitnessClass.trainer.charAt(0)} */}</div>
                <Typography  className="mb-6 text-gray-500">
                  {fitnessClass.description}
                </Typography>
              </CardBody>

              <CardFooter className="pt-0 ">
                <Button
                  size="lg"
                  fullWidth={true}
                  color="deep-orange"
                  variant="filled"
                  className="shadow-none hover:shadow-lg"
                >
                  Join Class
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
