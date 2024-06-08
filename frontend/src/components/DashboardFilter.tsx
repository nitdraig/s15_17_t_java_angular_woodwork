import { FaSearch } from 'react-icons/fa';

const DashboardFilter = () => {
  return (
    <div className="relative w-full max-w-[834px] mb-4">
      <input 
        type="text" 
        placeholder="" 
        className="py-2.5 pl-10 pr-2 rounded-lg border-none w-full max-w-[834px] mb-2.1 text-left bg-[#F3E8DB] focus:outline-none"
      />
      <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-none border-none text-black text-lg cursor-pointer">
        <FaSearch />
      </button>
    </div>
  );
}

export default DashboardFilter;
