import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Spinner from "../../components/Spinner";
import { UserI } from "../../types/Types";

const EditProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData: UserI = {
    id_user: 1,
    email: "franco99@gmail.com",
    fullName: "Franco Lacourt",
    profilePicture: "",
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserI>(initialData);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [alertIsHidden, setAlertIsHidden] = useState<boolean>(true);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    const file: File | any = e.target.files?.[0];
    setSelectedFile(file);
    console.log(selectedFile);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL("");
    }
  };

  const reestablecer = () => {
    setPreviewURL("");
    setSelectedFile(undefined);
    setUser(initialData);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-8 mx-24 relative h-screen">
      <div className="flex flex-col gap-y-10">
        <h2 className="text-4xl font-bold">Edición de perfil</h2>
        <div className="w-1/2 flex items-center gap-x-8">
          <div className="group relative w-28 h-28 rounded-full bg-white flex items-center justify-center hover:cursor-pointer">
            {previewURL ? (
              <img
                src={previewURL}
                alt="Previsualización"
                className="rounded-full w-full object-fit"
              />
            ) : (
              <div className="w-28 h-28 rounded-full flex items-center justify-center">
                <div className="rounded-full w-full h-full bg-[#8DB600] text-white flex items-center justify-center text-5xl">
                  {user?.fullName.split(" ")[0].charAt(0)}
                  {user?.fullName.split(" ")[0].charAt(1)}
                </div>
              </div>
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
            {previewURL ? (
              <div
                onClick={() => {
                  reestablecer();
                }}
                className="absolute bg-red-700 p-1 rounded-full z-30 top-0 right-0 text-sm text-white"
              >
                <AiOutlineClose />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <input
              type="text"
              name="fullName"
              value={user?.fullName}
              onChange={handleChange}
              placeholder="Name"
              className="text-xl font-bold rounded-sm focus:border-none block w-full active:border-none"
            />
            <span>{user?.email}</span>
          </div>
        </div>
        <h2 className="text-4xl font-bold mt-6">Contraseña y autenticación</h2>
        <button
          className="w-fit px-3 py-1.5 rounded-md bg-[#8DB600] font-bold text-white"
          onClick={() => setAlertIsHidden(false)}
        >
          Cambiar contraseña
        </button>
      </div>

      <div
        className={`${
          hasChanged ? "flex" : "hidden"
        } fixed z-50 bottom-10 left-1/2 -translate-x-1/2 w-3/4 flex items-center justify-between p-4 bg-white text-black rounded-xl border border-black`}
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
          {/* <div className='flex flex-col w-full gap-y-2'>
            <label className='text-xs text-slate-800 font-bold' htmlFor="">CONTRASEÑA ACTUAL</label>
            <input type="text" />
          </div> */}
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-xs text-slate-800 font-bold" htmlFor="">
              NUEVA CONTRASEÑA
            </label>
            <input type="text" />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-xs text-slate-800 font-bold" htmlFor="">
              CONFIRMAR NUEVA CONTRASEÑA
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
