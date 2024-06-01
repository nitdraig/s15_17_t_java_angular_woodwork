import { useState } from 'react';

const ReservationView = () => {
  // Estados para los valores de los sliders
  const [peopleCount, setPeopleCount] = useState(4);
  const [hoursCount, setHoursCount] = useState(3);
  const [daysCount, setDaysCount] = useState(2);

  return (
    <>
      <div className="pl-16 pb-6 pt-12 text-zinc-900 text-6xl font-bold font-sans tracking-wider">
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
                max="10"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="mb-8 w-2/6 flex flex-col space-y-4 p-8 bg-[#323E1D] rounded-lg shadow-md">
          <img className="w-full h-32 rounded-lg object-cover shadow-lg" src="src/assets/imgDashboard.png" alt="Small Image" />
          <button
            type="submit"
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
              <span className="text-white">$XXXXX</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationView;
