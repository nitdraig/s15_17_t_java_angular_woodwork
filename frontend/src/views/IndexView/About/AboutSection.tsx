import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section
      className="bg-[#A67C52] lg:h-screen h-full w-full py-16"
      id="about"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">
            Acerca de Nosotros
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Estamos comprometidos con la excelencia
          </p>
          <p className="mt-4 max-w-2xl text-xl text-black lg:mx-auto">
            Somos una plataforma innovadora que conecta a profesionales con
            espacios de coworking en áreas específicas.
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8DB600] text-[#556B2F]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    ></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nuestra Misión
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-black font-semibold" style={{ textShadow: '1px 1px 2px #BBBBBB' }}>
                Nuestra misión es proporcionar el mejor servicio posible.
                Estamos dedicados a ayudarte a tener éxito en todos tus
                esfuerzos.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8DB600] text-[#556B2F]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3"
                    ></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nuestra Visión
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-black font-semibold" style={{ textShadow: '1px 1px 2px #BBBBBB' }}>
                Nuestro objetivo es ser la empresa líder en nuestro campo,
                proporcionando calidad y servicio incomparables a nuestros
                clientes.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8DB600] text-[#556B2F]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V3H7v6H5v9h14V9h-2z"
                    ></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nuestros Valores
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-black font-semibold" style={{ textShadow: '1px 1px 2px #BBBBBB' }}>
                La Integridad, la Excelencia y el Trabajo en Equipo están en el
                núcleo de todo lo que hacemos.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8DB600] text-[#556B2F]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5h6M9 9h6M9 13h6M9 17h6"
                    ></path>
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Nuestra Historia
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-black font-semibold" style={{ textShadow: '1px 1px 2px #BBBBBB' }}>
                Fundada en 2024, por nuestro{" "}
                <a target="_blank" href="#" className="text-[#8DB600]" style={{ textShadow: "none" }}>
                  equipo
                </a>.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
