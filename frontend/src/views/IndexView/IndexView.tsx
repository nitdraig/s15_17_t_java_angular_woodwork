import HeroSection from "./Hero/HeroSection";
import About from "./About/AboutSection";
import FaqSection from "./Faq/FaqSection";
import ReviewSection from "./Reviews/ReviewSection";
import ContactSection from "./Contact/ContactSection";

const IndexView = () => {
  return (
    <>
      <HeroSection />
      <About />
      <FaqSection />
      <ReviewSection />
      <ContactSection />
    </>
  );
};

export default IndexView;
