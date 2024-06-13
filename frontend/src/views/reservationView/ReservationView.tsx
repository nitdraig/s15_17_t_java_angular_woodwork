import { useState, useEffect } from 'react';
import { FaWifi, FaCoffee, FaSnowflake, FaUsers, FaLock, FaPlug, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { fetchWorkspaceById } from '../../services/Api';
import { WorkspaceDetail } from '../../types/Types';
import PaymentModal from './ModalPayment/PaymentModal';
import DashboardFilter from '../../components/DashboardFilter';
import Spinner from '../../components/Spinner';

const ReservationView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [peopleCount, setPeopleCount] = useState(4);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspace, setWorkspace] = useState<WorkspaceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        if (id) {
          const fetchedWorkspace = await fetchWorkspaceById(parseInt(id));
          setWorkspace(fetchedWorkspace);
        } else {
          console.error("Invalid ID");
        }
      } catch (error) {
        console.error("Failed to fetch workspace", error);
      } finally {
        setLoading(false);
      }
    };
    loadWorkspace();
  }, [id]);
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-white z-50">
        <Spinner />
      </div>
    );
  }

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  const services = [
    { name: 'Wifi', icon: <FaWifi className="text-xl text-[#8DB600]" /> },
    { name: 'Café', icon: <FaCoffee className="text-xl text-[#8DB600]" /> },
    { name: 'Aire acondicionado', icon: <FaSnowflake className="text-xl text-[#8DB600]" /> },
    { name: 'Espacio: Público', icon: <FaUsers className="text-xl text-[#8DB600]" /> },
    { name: 'Tomacorrientes disponibles', icon: <FaPlug className="text-xl text-[#8DB600]" /> },
    { name: 'Espacio: Privado', icon: <FaLock className="text-xl text-[#8DB600]" /> }
  ];

  const openDays = workspace.openDays || [];

  type Time = {
    hour: number;
    minute: number;
  };
  
  const openingTime: Time = { hour: parseInt(workspace.openingTime), minute: 0 };
  const closingTime: Time = { hour: parseInt(workspace.closingTime), minute: 0 };

  const getMinTime = (time: Time): Date => {
    const date = new Date();
    date.setHours(time.hour, time.minute, 0, 0);
    return date;
  };
  
  const getMaxTime = (time: Time): Date => {
    const date = new Date();
    date.setHours(time.hour, time.minute, 0, 0);
    return date;
  };

  const capacity = workspace.capacity || 0;

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <DashboardFilter />
      <div className="px-4 md:px-16 my-4">
        <button
          onClick={handleGoBack}
          className="flex items-center text-zinc-900 text-xl font-semibold space-x-2 focus:outline-none hover:underline"
        >
          <FaArrowLeft className="text-xl" /> Volver
        </button>
      </div>
      <div className="pl-4 md:pl-16 pb-6 text-zinc-900 text-3xl md:text-6xl font-bold font-sans tracking-wider">
      {workspace.workspaceName}
      </div>

{/* IMAGES SECTION */}
<div className="flex flex-col md:flex-row px-4 md:px-12 mb-8">
  <div className="w-full md:w-8/12 flex items-stretch px-4 mb-4 md:mb-0">
    <img
      className="w-full rounded-lg object-cover shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
      src={workspace.mainImage}
      alt={workspace.workspaceName}
      style={{ height: '33rem' }}
    />
  </div>
  <div className="w-full md:w-4/12 flex flex-col justify-between space-y-4 px-4">
    <img
      className="w-full h-32 md:h-64 rounded-lg object-cover shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
      src={workspace.workspaceImages[0]}
      alt={workspace.workspaceName}
    />
    <img
      className="w-full h-32 md:h-64 rounded-lg object-cover shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
      src={workspace.workspaceImages[1]}
      alt={workspace.workspaceName}
    />
  </div>
</div>


      <div className="flex flex-col md:flex-row px-4 md:px-16">
        <div className="w-full md:w-4/6 p-4 md:p-8 md:pl-0">
          {/* INFORMATION */}
          <div>
            <div className="text-zinc-900 text-3xl md:text-6xl font-bold font-sans tracking-wider">{workspace.workspaceName}</div>
            <div className="text-zinc-500 text-xl md:text-3xl font-normal font-['Montserrat'] tracking-wider">{workspace.address}</div>
            
            <div className="w-full md:w-100 h-28 mt-4 flex-shrink-0 bg-[#848B77] opacity-80 rounded-[10px] mb-6 flex justify-around items-center">
              <div className="text-center text-[#000000] font-kanit font-bold text-[12px] md:text-[16px] leading-normal tracking-[0.64px]">
                Favorito entre<br />los freelancers
              </div>
              <div className="w-[120px] md:w-[186px] text-center text-[#000000] font-kanit font-bold text-[12px] md:text-[16px] leading-normal tracking-[0.64px]">
                Uno de los mejores<br />CoWorks del mes
              </div>
              <div className=" fill-[#F9EC34] flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="47" viewBox="0 0 49 47" fill="none">
                  <path d="M24.4988 39.3747L12.6227 46.5599C12.098 46.8952 11.5495 47.0389 10.9772 46.991C10.4048 46.9431 9.90404 46.7515 9.47478 46.4162C9.04552 46.0809 8.71166 45.6622 8.47318 45.1602C8.2347 44.6582 8.18701 44.0949 8.33009 43.4703L11.478 29.8903L0.961181 20.7651C0.484228 20.334 0.18661 19.8426 0.0683257 19.2907C-0.0499585 18.7389 -0.0146642 18.2005 0.174209 17.6755C0.36499 17.1486 0.651161 16.7175 1.03272 16.3822C1.41429 16.0469 1.93893 15.8313 2.60667 15.7355L16.486 14.514L21.8517 1.72444C22.0902 1.14963 22.4603 0.718517 22.962 0.43111C23.4638 0.143703 23.976 0 24.4988 0C25.0234 0 25.5357 0.143703 26.0355 0.43111C26.5354 0.718517 26.9055 1.14963 27.1459 1.72444L32.5116 14.514L46.3909 15.7355C47.0586 15.8313 47.5833 16.0469 47.9648 16.3822C48.3464 16.7175 48.6326 17.1486 48.8234 17.6755C49.0141 18.2024 49.0504 18.7418 48.9321 19.2936C48.8138 19.8454 48.5152 20.336 48.0364 20.7651L37.5196 29.8903L40.6675 43.4703C40.8106 44.093 40.7629 44.6563 40.5244 45.1602C40.2859 45.6642 39.952 46.0828 39.5228 46.4162C39.0935 46.7515 38.5927 46.9431 38.0204 46.991C37.448 47.0389 36.8995 46.8952 36.3749 46.5599L24.4988 39.3747Z" fill="#F9EC34" />
                </svg>
                <div className="text-[#000000] font-kanit font-bold text-[12px] md:text-[16px] leading-normal tracking-[0.64px]">
                  4.89
                </div>
              </div>
              <div className="text-[#000000] font-kanit font-bold text-[12px] md:text-[16px] leading-normal tracking-[0.64px]">
                Opiniones
              </div>
            </div>

            {/* Días, Horarios + Capacidad Disponibles */}
            <div className="bg-gray-200 p-4 rounded-lg mt-3 px-8 mb-4 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-2 md:mb-0 text-center md:text-left">
                <span className="font-bold text-lg">Días disponibles:</span><br/> {openDays.join(', ')}
              </div>
              <div className="mb-2 md:mb-0 text-center md:text-left">
                <span className="font-bold text-lg">Horario de apertura:</span><br/> {openingTime.hour}:{openingTime.minute === 0 ? '00' : openingTime.minute}
              </div>
              <div className="mb-2 md:mb-0 text-center md:text-left">
                <span className="font-bold text-lg">Horario de cierre:</span><br/> {closingTime.hour}:{closingTime.minute === 0 ? '00' : closingTime.minute}
              </div>
              <div className="text-center md:text-left">
                <span className="font-bold text-lg">Capacidad:</span><br/> {capacity} personas
              </div>
            </div>
          </div>

          {/* FORM RESERVA INPUT */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-6">
              <label className="text-zinc-700 font-semibold">Elige el día para realizar tu Reserva:</label>
              <div className="flex items-center space-x-4">
                <label className="text-zinc-700 font-semibold w-full">Cantidad de Personas:</label>
                <input
                  type="number"
                  min="1"
                  max={capacity}
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="w-3/6 h-8 items-center p-2  bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-zinc-700 font-semibold w-full">Hora de Inicio:</label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Inicio"
                  dateFormat="h:mm aa"
                  className="w-full h-8 p-2 bg-gray-200 rounded-lg cursor-pointer"
                  minTime={getMinTime(openingTime)}
                  maxTime={getMaxTime(closingTime)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-zinc-700 font-semibold w-full">Hora de Fin:</label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Fin"
                  dateFormat="h:mm aa"
                  className="w-full h-8 p-2 bg-gray-200 rounded-lg cursor-pointer"
                  minTime={getMinTime(openingTime)}
                  maxTime={getMaxTime(closingTime)}
                />
              </div>
            </div>
            <div className="flex justify-center z-0">
              <DatePicker
                selected={selectedDay}
                onChange={(date) => setSelectedDay(date)}
                inline
                className="w-full p-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="w-full md:w-2/6 md:mt-20 flex flex-col h-5/6 space-y-8 py-12 px-8 mb-4 bg-[#323E1D] rounded-lg shadow-md">
          <img className="w-full h-44 mt-2 rounded-lg object-cover transition-transform transform hover:scale-105 cursor-pointer shadow-lg" src={workspace.mainImage} alt="Small Image" />
          <button
            onClick={handleReserveClick}
            className="w-full bg-[#F9EC34] hover:bg-[#A67C52] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#31543D] font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
          >
            Reservar
          </button>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-white">Día de Reserva:</span>
              <span className="text-white">{selectedDay?.toLocaleDateString() ?? 'No seleccionado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Cantidad de Personas:</span>
              <span className="text-white">{peopleCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Hora de Inicio:</span>
              <span className="text-white">
                {startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Hora de Fin:</span>
              <span className="text-white">
                {endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No seleccionado'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-white">Precio por Hora x Persona:</span>
              <span className="text-white">${workspace.pricePerHour}</span>
            </div>
            <hr className="border-t border-white my-4" />
            <div className="flex justify-between">
              <span className="font-semibold text-white">Total:</span>
              <span className="text-white">
                {startTime && endTime ? `$${(endTime.getHours() - startTime.getHours()) * workspace.pricePerHour * peopleCount}` : 'No disponible'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICIOS */}
      <div className="px-7 md:px-16 md:mt-8 mb-8">
        <h2 className="text-zinc-900 text-center md:text-left text-3xl md:text-4xl font-bold font-sans tracking-wider mb-6 md:mb-4">Servicios Disponibles</h2>
        <div className="grid grid-cols-2 gap-4 ">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-2 ">
              {service.icon}
              <span className="text-[zinc-700] text-xl">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t border-gray-300 mx-16 my-8" />

      {/* DESCRIPTION */}
      <div className="px-4 md:px-16 mb-8">
        <h2 className="text-zinc-900 text-center md:text-left text-2xl md:text-4xl font-bold font-sans tracking-wider mb-4">Descripción del coworking</h2>
        <p className="text-zinc-700 text-medium md:text-xl px-2 md:px-0">
          {workspace.description}
        </p>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        peopleCount={peopleCount}
        startTime={startTime!}
        endTime={endTime!}
        selectedDay={selectedDay!}
        pricePerHour={workspace.pricePerHour}
      />
    </>
  );
};

export default ReservationView;