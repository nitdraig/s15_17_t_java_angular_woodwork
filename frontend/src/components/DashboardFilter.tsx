import { FaSearch } from 'react-icons/fa';

const DashboardFilter = () => {
  return (
    <div className="w-screen -mx-4 px-4 bg-[#323E1D] py-6 flex flex-col items-center box-border">
      <div className="relative w-full max-w-[834px] mb-4">
        <input 
          type="text" 
          placeholder="Buscar" 
          className="py-2.5 pl-10 pr-2 rounded-lg border-none w-full mb-2.1 text-left bg-[#F3E8DB] focus:outline-none"
        />
        <button className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-none border-none text-black text-lg cursor-pointer">
          <FaSearch />
        </button>
      </div>
      <div className="w-full overflow-x-auto md:overflow-x-hidden">
        <div className="flex gap-5 justify-center md:justify-center w-max md:w-full">
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            Full Nature
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            Creativo
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            con Resto
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            24hs.
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            Privado
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            Bar Style
          </button>
          <button className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4.5">
            Público
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardFilter;
