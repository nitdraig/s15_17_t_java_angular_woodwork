import React from "react";
import { reviews } from "../../../services/ReviewsAPI";

const ReviewSection: React.FC = () => {
  return (
    <section
      className="bg-[#A67C52] w-full lg:h-screen h-full py-16"
      id="reviews"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            Reviews
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            ¡Nuestros usuarios opinan!
          </p>
          <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
            Aquí tienes algunas reseñas de usuarios que han utilizado nuestra
            plataforma:
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg hover:shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={review.img}
                    className="block w-12 h-12 bg-gray-200 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg leading-6 font-medium text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-500">{review.title}</div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927C9.432 2.223 10.568 2.223 10.951 2.927L13.1 7.259l4.852.706c.674.098.941.926.455 1.4l-3.507 3.42.827 4.818c.112.65-.573 1.15-1.12.844L10 15.347l-4.307 2.264c-.547.306-1.232-.194-1.12-.844l.827-4.818L1.893 9.365c-.486-.474-.219-1.302.455-1.4l4.852-.706 2.149-4.332z"></path>
                    </svg>
                  ))}
                {Array(5 - review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927C9.432 2.223 10.568 2.223 10.951 2.927L13.1 7.259l4.852.706c.674.098.941.926.455 1.4l-3.507 3.42.827 4.818c.112.65-.573 1.15-1.12.844L10 15.347l-4.307 2.264c-.547.306-1.232-.194-1.12-.844l.827-4.818L1.893 9.365c-.486-.474-.219-1.302.455-1.4l4.852-.706 2.149-4.332z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-base text-gray-500">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
