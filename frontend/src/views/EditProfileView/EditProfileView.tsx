import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Spinner from "../../components/Spinner";
import { UserI } from "../../types/Types";
import profileImage from '../../assets/woodwork.jpg'; // Asegúrate de que la ruta es correcta

const EditProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData: UserI = {
    id_user: 1,
    email: "franco99@gmail.com",
    fullName: "Agustín Avellaneda",
    profilePicture: profileImage,
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserI>(initialData);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [alertIsHidden, setAlertIsHidden] = useState<boolean>(true);
  const [previewURL, setPreviewURL] = useState<string>("");

  console.log("Profile Image URL:", profileImage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");

        if (!token) {
          alert("Inicia sesión para continuar!");
          navigate("/login");
        }

        const response = await fetch(
          `https://woodwork.onrender.com/v1/api/user/getUserById/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: UserI = await response.json();
        setUser(data);
        reestablecer();
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const dataHasChanged = Object.keys(initialData).some(
      (key) => user[key as keyof UserI] !== initialData[key as keyof UserI]
    );

    setHasChanged(dataHasChanged);
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUser((prevState) => ({
        ...prevState,
        profilePicture: URL.createObjectURL(file), // Aquí actualizamos el perfil del usuario con la URL del archivo seleccionado
      }));
    } else {
      setPreviewURL("");
    }
  };

  const reestablecer = () => {
    setPreviewURL("");
    setUser(initialData);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative mt-8">
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Previsualización"
                  className="shadow-xl rounded-full align-middle border-none max-w-[150px]"
                />
              ) : (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="shadow-xl rounded-full align-middle border-none max-w-[150px]"
                />
              )}
              <label
                htmlFor="fileInput"
                className="absolute hidden bg-black/50 w-full h-full rounded-full gap-x-1 text-3xl group-hover:flex group-hover:items-center group-hover:justify-center hover:cursor-pointer text-white"
              >
                <input
                  name="profilePicture"
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <FiEdit />
              </label>
              {previewURL && (
                <div
                  onClick={() => {
                    reestablecer();
                  }}
                  className="absolute bg-red-700 p-1 rounded-full z-30 top-0 right-0 text-sm text-white"
                >
                  <AiOutlineClose />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-20">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
            {user?.fullName}
          </h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
            Buenos Aires, Argentina
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                Me llamo Agustín, soy viajero, desarrollador tiempo completo, 
                gracias a Woodwork puedo armar grupos de trabajo en lugares especialmente tranquilos para la concentración y el desarrollo de proyectos.
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

      <div
        className={`${
          hasChanged ? "flex" : "hidden"
        } fixed z-50 bottom-10 left-1/2 -translate-x-1/2 w-3/4 flex items-center justify-between p-4 bg-black text-black rounded-xl border border-black`}
      >
        <span className="font-bold text-xl">
          Cuidado, ¡tienes cambios sin guardar!
        </span>
        <div className="flex items-center justify-center gap-x-2">
          <button onClick={reestablecer} className="font-bold hover:underline">
            Reestablecer
          </button>
          <button className="px-3 py-1.5 rounded-md bg-green-700 font-bold text-white">
            Guardar cambios
          </button>
        </div>
      </div>

      <div
        className={`${
          !alertIsHidden ? "flex" : "hidden"
        } fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[350px] min-h-[350px] flex flex-col items-center justify-between p-4 text-black rounded-xl border border-black bg-slate-100`}
      >
        <div
          onClick={() => setAlertIsHidden(true)}
          className="absolute top-3 right-3 hover:cursor-pointer text-2xl z-10"
        >
          <AiOutlineClose />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Actualiza tu contraseña</h2>
          <h2 className="text-md text-slate-800">
            Introduce tu contraseña actual y una nueva contraseña.
          </h2>
        </div>
        <div className="flex flex-col items-start w-full gap-y-4 mt-6">
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-xs text-slate-800 font-bold" htmlFor="">
              NUEVA CONTRASEÑA
            </label>
            <input type="text" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-3 mt-6 w-full ">
          <button
            onClick={() => setAlertIsHidden(true)}
            className="font-bold hover:underline"
          >
            Cancelar
          </button>
          <button className="px-3 py-1.5 rounded-md bg-green-700 font-bold text-white">
            Cambiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileView;
