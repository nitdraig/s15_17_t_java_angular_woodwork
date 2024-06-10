import React from "react";
import ContactForm from "../../../components/ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section
      className="bg-[#556B2F] w-full lg:h-full h-screen pt-10 pb-12"
      id="contact"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            Contáctanos
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Resolvemos tus dudas
          </p>
          <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
            Estamos encantados por saber qué opinas de nuestra plataforma. Y
            resolver tus dudas
          </p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
