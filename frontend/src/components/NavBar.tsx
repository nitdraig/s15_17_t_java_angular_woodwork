import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="font-sans flex flex-col lg:h-24 sm:flex-row sm:justify-between py-4 px-6 lg:px-24 bg-white shadow sm:items-center w-full">
      <div className="flex justify-between items-center">
        <a href="/#" className="lg:text-5xl text-3xl font-bold text-[#262626]">
          WoodWork
        </a>
        <button
          className="sm:hidden text-3xl text-[#262626]"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>
      <div
        className={`sm:flex flex-col sm:flex-row sm:items-center space-x-4 sm:space-x-10 ${
          isMenuOpen ? "block" : "hidden"
        } mt-4 sm:mt-0`}
      >
        <a
          href="/#about"
          className="text-lg no-underline mt-2 sm:mt-0 ml-2 text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Nosotros
        </a>
        <a
          href="/#prices"
          className="text-lg no-underline mt-2 sm:mt-0 ml-2 text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Precios
        </a>
        <a
          href="/#contact"
          className="text-lg no-underline mt-2 sm:mt-0 ml-2 text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Contacto
        </a>
        <a
          href="/login"
          className="mt-2 sm:mt-0 sm:ml-4 w-32 bg-[#31543D] hover:bg-[#A67C52] text-white py-2 px-6 rounded-lg text-center font-bold transition duration-150 ease-in-out"
        >
          Ingresar
        </a>
        <a
          href="/register"
          className="mt-2 sm:mt-0 sm:ml-4 w-32 bg-[#31543D] hover:bg-[#A67C52] text-white py-2 px-6 rounded-lg text-center font-bold transition duration-150 ease-in-out"
        >
          Registrar
        </a>
      </div>
    </nav>
  );
}
