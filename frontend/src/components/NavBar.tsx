import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../services/Api";
import logo from "../assets/logo_nobac.png";
import profileImage from "../assets/Profile.png";
export default function NavBar() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOut = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="font-sans flex flex-col lg:h-20 sm:flex-row sm:justify-between py-4 px-6 lg:px-24 bg-white shadow sm:items-center w-full">
      <div className="flex justify-between items-center">
        <a href="/#">
          <img src={logo} className="lg:h-20 h-16" />
        </a>
        <button
          className="sm:hidden text-3xl text-[#262626]"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>
      <div
        className={`sm:flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 space-x-3 lg:space-x-10 ${
          isMenuOpen ? "block" : "hidden"
        } mt-4 sm:mt-0`}
      >
        <a
          href="/#about"
          className="text-base md:text-lg no-underline text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Nosotros
        </a>
        <a
          href="/#faq"
          className="text-base md:text-lg lg:flex no-underline text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Preguntas
        </a>
        <a
          href="/#contact"
          className="text-base md:text-lg no-underline text-[#262626] hover:text-gray-800 font-bold transition duration-150 ease-in-out"
        >
          Contáctanos
        </a>
        <a
          href="/login"
          className={`${
            !user ? "" : "hidden"
          } mt-2 sm:mt-0 ml-4 w-32 hover:bg-[#556B2F] bg-[#8DB600] text-white py-2 px-6 text-center font-bold rounded-lg transition duration-150 ease-in-out`}
        >
          Ingresar
        </a>
        <div className={`${user ? "" : "hidden"} relative`}>
          <button
            onClick={() => setDropdown(!dropdown)}
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            type="button"
          >
            <span className="sr-only">Open user menu</span>

            <img
              src={profileImage}
              alt="Previsualización"
              className=" object-fit w-14 h-14 align-middle border-lg rounded-full border border-[#8DB600] hover:border-[#5a682b] flex items-center justify-center"
            />
          </button>

          <div
            id="dropdownAvatar"
            className={`${
              dropdown ? "flex" : "hidden"
            } absolute left-1/2 -translate-x-1/2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 flex flex-col`}
          >
            <div className="px-4 py-3 text-sm text-gray-900">
              <div>{user?.fullName}</div>
              <div className="font-medium truncate">{user?.email}</div>
            </div>
            <ul
              className="flex flex-col py-2 text-sm text-gray-700"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <Link
                  className="block px-4 py-2  hover:bg-gray-100"
                  to={`/dashboard`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-2 hover:bg-gray-100"
                  to={`/editProfile/${user?.id_user}`}
                >
                  Editar perfil
                </Link>
              </li>
            </ul>
            <div className="py-2 w-full">
              <button
                onClick={logOut}
                className="text-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
