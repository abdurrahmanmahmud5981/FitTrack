import { Button, Input, Textarea } from "@material-tailwind/react";
import BannerSection from "../components/Carousel/BannerSection";
import { motion } from "framer-motion";
import FeaturedSection from "../components/Home/FeaturedSection";
import AboutSection from "../components/Home/AboutSection";
import FeaturedClasses from "../components/Home/FeaturedClasses";
import ContactForm from "../components/Home/CotactForm";
import TestimonialsCarousel from "../components/Home/Testimonials";
import CommunityPosts from "../components/Home/CommunityPost";

const Home = () => {
  // Sample Classes Data
  const classes = [
    {
      id: 1,
      title: "Yoga for Beginners",
      description:
        "Start your journey with yoga and improve your flexibility, balance, and peace of mind.",
      image: "https://via.placeholder.com/300x200?text=Yoga",
    },
    {
      id: 2,
      title: "Strength Training",
      description:
        "Develop your muscle strength and endurance with expert trainers and equipment.",
      image: "https://via.placeholder.com/300x200?text=Strength+Training",
    },
    {
      id: 3,
      title: "Cardio Blast",
      description:
        "Boost your heart health with fun, high-energy cardio classes for all levels.",
      image: "https://via.placeholder.com/300x200?text=Cardio",
    },
    {
      id: 4,
      title: "Zumba Dance",
      description:
        "Experience the joy of dancing while burning calories with our Zumba sessions.",
      image: "https://via.placeholder.com/300x200?text=Zumba",
    },
    {
      id: 5,
      title: "Pilates",
      description:
        "Strengthen your core, improve posture, and increase body awareness with Pilates.",
      image: "https://via.placeholder.com/300x200?text=Pilates",
    },
  ];
  return (
    <div>
      <section>
        <BannerSection />
      </section>
      <section>
        <FeaturedSection />
      </section>
      {/* About Us Section */}
      <section>
        <AboutSection />
      </section>
      {/* Classes Section */}
      <section>
        <FeaturedClasses />
      </section>
      {/* Contact Section */}
      <section>
        <ContactForm />
      </section>
      <section>
        <TestimonialsCarousel/>
      </section>
      <section>
        <CommunityPosts/>
      </section>
    </div>
  );
};

export default Home;
