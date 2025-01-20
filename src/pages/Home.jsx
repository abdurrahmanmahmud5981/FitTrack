import BannerSection from "../components/Carousel/BannerSection";
import FeaturedSection from "../components/Home/FeaturedSection";
import AboutSection from "../components/Home/AboutSection";
import FeaturedClasses from "../components/Home/FeaturedClasses";
import ContactForm from "../components/Home/CotactForm";
import TestimonialsCarousel from "../components/Home/Testimonials";
import CommunityPosts from "../components/Home/CommunityPost";
import Newsletter from "../components/Home/NewsLetter";
import TeamSection from "../components/Home/TeamSection";
import { Helmet } from "react-helmet-async";

const Home = () => {

  return (
    <div>
      <Helmet>
        <title>FitTrack - Home</title>
        <meta
          name="description"
          content="Welcome to FitTrack, your one-stop fitness destination! Enjoy our wide range of classes, personal trainers, and community support."
        />  {/* SEO Meta Tags */}
        <meta property="og:title" content="FitTrack - Home" />
        <meta property="og:description" content="Welcome to FitTrack, your one-stop fitness destination!" />
      </Helmet>
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
        <TestimonialsCarousel />
      </section>
      <section>
        <CommunityPosts />
      </section>
      <section>
        <Newsletter />
      </section>
      <section>
        <TeamSection />
      </section>
    </div>
  );
};

export default Home;
