import useAuth from "../../../services/Api";
import profileImage from "../../../assets/Profile.png";

const UserDescription = () => {
  const { user } = useAuth();
  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-center">
        <div className="w-full flex justify-center">
          <div className="relative mt-2">
            <img
              src={profileImage}
              alt="Profile"
              className="shadow-xl rounded-full align-middle border-none w-44 h-44"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
          {user?.fullName}
        </h3>
        <div className="text-xs mt-0 mb-1 text-slate-400 font-bold">
          <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
          <p className=" uppercase">Buenos Aires, Argentina</p>
          <p className="text-xs mt-0 mb-1 text-slate-400 font-bold ">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="mt-6 py-6 border-t border-slate-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4">
            <p className="font-light leading-relaxed text-slate-600 mb-4">
              Soy {user?.fullName} soy viajero, desarrollador tiempo completo,
              gracias a Woodwork puedo armar grupos de trabajo en lugares
              especialmente tranquilos para la concentración y el desarrollo de
              proyectos.
            </p>
            <a
              href="javascript:;"
              className="font-normal text-slate-700 hover:text-slate-400"
            >
              Cambiar contraseña
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
