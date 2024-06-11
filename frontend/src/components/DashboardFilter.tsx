import { FaSearch } from 'react-icons/fa';

const DashboardFilter = () => {
  return (
    <div className="w-full mr-2 px-4 bg-[#323E1D] py-6 flex flex-col items-center box-border">
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
          {["Full Nature", "Creativo", "con Resto", "24hs.", "Privado", "Bar Style", "Público"].map((text, index) => (
            <button
              key={index}
              className="text-[#D9D9D9] font-share-tech text-2xl font-normal leading-normal tracking-wider cursor-pointer transition-colors duration-300"
              style={{
                color: '#D9D9D9',
                textDecoration: 'none', // Inicialmente sin subrayado
                transition: 'color 0.3s, text-decoration-color 0.3s', // Transición para color y subrayado
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textDecorationColor = '#F9EC34';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#D9D9D9';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardFilter;
