import { useState } from 'react';
import { FaWifi, FaCoffee, FaSnowflake, FaUsers, FaLock, FaPlug, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../../components/PaymentModal';


const ReservationView = () => {
  const navigate = useNavigate(); 

  const [peopleCount, setPeopleCount] = useState(4);
  const [hoursCount, setHoursCount] = useState(3);
  const [daysCount, setDaysCount] = useState(2);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { name: 'Wifi', icon: <FaWifi className="text-xl text-zinc-700" /> },
    { name: 'Café', icon: <FaCoffee className="text-xl text-zinc-700" /> },
    { name: 'Aire acondicionado', icon: <FaSnowflake className="text-xl text-zinc-700" /> },
    { name: 'Espacio: Público', icon: <FaUsers className="text-xl text-zinc-700" /> },
    { name: 'Tomacorrientes disponibles', icon: <FaPlug className="text-xl text-zinc-700" /> },
    { name: 'Espacio: Privado', icon: <FaLock className="text-xl text-zinc-700" /> }
  ];

  const handleGoBack = () => {
    navigate('/dashboard'); // Navegamos de vuelta a la ruta /dashboard
  };

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="px-16 my-4">
        <button
          onClick={handleGoBack}
          className="flex items-center text-zinc-900 text-xl font-semibold space-x-2 focus:outline-none hover:underline"
        >
          <FaArrowLeft className="text-xl" /> Volver
        </button>
      </div>
      <div className="pl-16 pb-6  text-zinc-900 text-6xl font-bold font-sans tracking-wider">
        Work Together
      </div>

      <div className="flex px-16 mb-8">
        <div className="w-4/6 flex items-stretch pr-5">
          <img className="w-full h-86 rounded-lg object-cover shadow-lg" src="src/assets/imgDashboard.png" alt="Work Together" />
        </div>
        <div className="w-2/6 flex flex-col justify-between space-y-4">
          <img className="w-full h-43 rounded-lg object-cover shadow-lg" src="src/assets/imgDashboard.png" alt="Work Together" />
          <img className="w-full h-43 rounded-lg object-cover shadow-lg" src="src/assets/imgDashboard.png" alt="Work Together" />
        </div>
      </div>

      <div className="flex px-16">
        <div className="w-4/6 p-8 pl-0">
          <div className="text-zinc-900 text-6xl font-bold font-sans tracking-wider">Work Together</div>
          <div className="text-zinc-500 text-3xl font-normal font-['Montserrat'] tracking-wider">Tagle 3000</div>
          {/* Sliders */}
          <div className="mt-28 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-zinc-700 font-semibold w-2/6">Cantidad de personas:</label>
              <input
                type="range"
                min="1"
                max="30"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-4/6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-zinc-700 font-semibold w-2/6">Cantidad de horas:</label>
              <input
                type="range"
                min="1"
                max="24"
                value={hoursCount}
                onChange={(e) => setHoursCount(Number(e.target.value))}
                className="w-4/6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-zinc-700 font-semibold w-2/6">Cantidad de días:</label>
              <input
                type="range"
                min="1"
                max="30"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-4/6 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-2/6 flex flex-col space-y-4 p-8 bg-[#323E1D] rounded-lg shadow-md">
          <img className="w-full h-32 rounded-lg object-cover shadow-lg" src="src/assets/imgDashboard.png" alt="Small Image" />
          <button
            onClick={handleReserveClick}
            className="w-full bg-[#F9EC34] hover:bg-[#A67C52] focus:ring-4 focus:outline-none focus:ring-[#31543D] font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
          >
            Reservar
          </button>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de personas:</span>
              <span className="text-white">{peopleCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de horas:</span>
              <span className="text-white">{hoursCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de días:</span>
              <span className="text-white">{daysCount}</span>
            </div>
            <hr className="border-t border-white my-4" />
            <div className="flex justify-between">
              <span className="font-semibold text-white">Total:</span>
              <span className="text-white">${hoursCount * 5000 * daysCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-16 mt-12 mb-8">
        <h2 className="text-zinc-900 text-4xl font-bold font-sans tracking-wider mb-4">Servicios Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-2">
              {service.icon}
              <span className="text-zinc-700 text-xl">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t border-gray-300 mx-16 my-8" /> {/* Separador */}

      <div className="px-16 mb-8"> {/* Descripción del coworking */}
        <h2 className="text-zinc-900 text-4xl font-bold font-sans tracking-wider mb-4">Descripción del coworking</h2>
        <p className="text-zinc-700 text-xl">
          Nuestro espacio de coworking en Tagle 3000 ofrece un ambiente moderno y cómodo para trabajar. Equipado con conexión Wi-Fi de alta velocidad, aire acondicionado para mantenerte fresco y café ilimitado para mantenerte despierto. Contamos con espacios públicos y privados, adaptados a tus necesidades, y tomacorrientes disponibles en todas las áreas. Ideal para trabajar en equipo o de manera individual, asegurando una experiencia productiva y agradable.
        </p>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        peopleCount={peopleCount}
        hoursCount={hoursCount}
        daysCount={daysCount}
      />
    </>
  );
};

export default ReservationView;
