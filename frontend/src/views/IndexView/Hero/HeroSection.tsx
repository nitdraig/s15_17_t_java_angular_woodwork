import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { slides } from "../../../services/SlidesAPI";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-black">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative bg-black">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full lg:h-[580px] h-[70vh] opacity-35 object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl mb-6">{slide.description}</p>
              <a
                href={slide.buttonLink}
                className="inline-block transition duration-150 ease-in-out py-2 px-6 rounded-lg text-lg font-semibold text-white bg-[#556B2F] hover:bg-[#8DB600]"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;
