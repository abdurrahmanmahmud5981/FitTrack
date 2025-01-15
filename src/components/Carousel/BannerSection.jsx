import { Carousel, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import banner1 from "../../assets/hero_slider_1.png";
import banner2 from "../../assets/hero_slider_bg_2.png";
import banner3 from "../../assets/hero-slider2.jpg";
const BannerSection = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Welcome to FitZone",
      description: "Your ultimate destination for health and fitness classes.",
      buttonLabel: "Explore Classes",
      image: banner1,
    },
    {
      id: 2,
      title: "Achieve Your Fitness Goals",
      description: "Join our community and unlock your potential today.",
      buttonLabel: "View Classes",
      image: banner2,
    },
    {
      id: 3,
      title: "Stay Active, Stay Healthy",
      description: "Discover the joy of a healthy lifestyle with us.",
      buttonLabel: "Start Now",
      image: banner3,
    },
  ];

  return (
    <div className="w-full h-auto">
      <Carousel className="rounded-lg">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[600px]">
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover  bg-top"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg mb-6">{slide.description}</p>
                <Button
                  color="lightBlue"
                  size="lg"
                  ripple="light"
                  onClick={() => navigate("/classes")}
                  className="px-6 py-3"
                >
                  {slide.buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSection;
