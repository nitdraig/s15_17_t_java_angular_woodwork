import React, { useState } from "react";
import { faqs } from "../../../services/FaqAPI";
const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#556B2F] w-full h-screen py-16" id="faq">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide">
            FAQs
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Preguntas Frecuentes
          </p>
          <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
            Acá tienes algunas preguntas más frecuentes
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-6 ">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg transition duration-300 ease-in-out p-6"
              >
                <dt
                  className="text-lg leading-6 font-medium text-gray-900 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span>{activeIndex === index ? "-" : "+"}</span>
                </dt>
                {activeIndex === index && (
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
