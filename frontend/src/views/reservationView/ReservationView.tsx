const ReservationView = () => {
  return (
    <>
      <div className="pl-12 pb-6 pt-12 text-zinc-900 text-6xl font-bold font-['Kanit'] tracking-wider">
        Work Together
      </div>
      <div className="flex px-12 mb-8">
        <div className="w-3/5 flex items-stretch pr-5">
          <img className="w-full rounded-lg object-cover" src="src/assets/imgDashboard.png" alt="Work Together" />
        </div>
        <div className="w-2/5 flex flex-col justify-between space-y-4">
          <img className="w-full h-1/2 rounded-lg object-cover" src="src/assets/imgDashboard.png" alt="Work Together" />
          <img className="w-full h-1/2 rounded-lg object-cover" src="src/assets/imgDashboard.png" alt="Work Together" />
        </div>
      </div>
      
      <div className="flex px-12">
        <div className="w-3/5 text-zinc-900 text-6xl font-bold font-['Kanit'] tracking-wider">
          Work Together
        </div>
        <div className="w-2/5 flex flex-col space-y-4 p-8 bg-[#323E1D] rounded-lg shadow-md">
          <img className="w-full h-32 rounded-lg object-cover" src="src/assets/imgDashboard.png" alt="Small Image" />
          <button
            type="submit"
            className="w-full bg-[#F9EC34] hover:bg-[#A67C52] focus:ring-4 focus:outline-none focus:ring-[#31543D] font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
          >
            Reservar
          </button>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de personas:</span>
              <span className="text-white">4</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de horas:</span>
              <span className="text-white">3</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de días:</span>
              <span className="text-white">2</span>
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
