import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../services/Api';

import { AiOutlineClose } from 'react-icons/ai';
import { FiEdit } from "react-icons/fi";
import { toast } from 'react-toastify';

import { UserI } from '../../types/Types';
import Spinner from '../../components/Spinner';

const EditProfileView = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const initialData: UserI = {
    id_user: 1,
    email: "franco99@gmail.com",
    fullName: "Franco Lacourt",
    profilePicture: "",
  };

  const [user, setUser] = useState<UserI>(initialData);
  const [token, setToken] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertIsHidden, setAlertIsHidden] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>('');

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    setToken(userToken)
    getUserById();
  }, [id]);

  useEffect(() => {
    const dataHasChanged = Object.keys(initialData).some(
      key => user[key as keyof UserI] !== initialData[key as keyof UserI]
    );

    setHasChanged(dataHasChanged);
  }, [user]);

  const getUserById = async () => {
    const token = window.localStorage.getItem("token");
    
    try {

      if (!token) {
        toast.error("Inicia sesión para continuar!")
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 2500);
      }

      const response = await fetch(`https://woodwork.onrender.com/v1/api/user/getUserById/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Lo siento, hubo un error. Vuelve a intentarlo.');
      }

      const data: UserI = await response.json();
      setUser(data)
      clear()
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e)

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
      setPreviewURL('');
    }
  }

  const editUser = async () => {
    let body = new FormData();

    body.append("fullName", user.fullName);
    if (selectedFile) {
      body.append("profilePicture", selectedFile);
    }

    try {
      const response = await fetch(`https://woodwork.onrender.com/v1/api/user/updateUser/${id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Lo siento, hubo un error. Vuelve a intentarlo.');
      }

      const data = await response.json();
      console.log(data);

    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }

  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value)
  }

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value)
  }

  const changePassword = async () => {
    let body = new FormData();
    body.append("password", password);

    try {
      const response = await fetch(`https://woodwork.onrender.com/v1/api/user/changeUserPassword/${id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Lo siento, hubo un error. Vuelve a intentarlo.');
      }

      const data = await response.json();
      console.log(data);
      setAlertIsHidden(true)
      toast.success("Se cambió correctamente su contraseña.")
      getUserById()

    } catch (error) {
      console.log(error);
      
      toast.error("No se pudo cambiar la contraseña, intentalo nuevamente.")
    }

  }

  const clear = () => {
    setPreviewURL("")
    setSelectedFile(undefined)
    setUser(initialData)
  }

  if (loading) {
    return <Spinner />;
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='my-8 mx-24 relative h-screen'>
      <div className='flex flex-col gap-y-10'>
        <h2 className='text-4xl font-bold'>Edición de perfil</h2>
        <div className='w-1/2 flex items-center gap-x-8'>
          <div className='group relative w-28 h-28 rounded-full bg-white flex items-center justify-center hover:cursor-pointer'>
            {
              previewURL ? (
                <img src={previewURL} alt="Profile image" className='rounded-full w-full object-fit' />
              ) :
                <div className='w-28 h-28 rounded-full flex items-center justify-center'>
                  <div className='rounded-full w-full h-full bg-[#8DB600] text-white flex items-center justify-center text-5xl'>
                    {user?.fullName.split(' ')[0].charAt(0)}{user?.fullName.split(' ')[0].charAt(1)}
                  </div>
                </div>
            }
            <label htmlFor="fileInput" className='absolute hidden bg-black/50 w-full h-full rounded-full gap-x-1 text-3xl group-hover:flex group-hover:items-center group-hover:justify-center hover:cursor-pointer text-white'>
              <input name='profilePicture' id="fileInput" type="file" onChange={handleFileChange} accept="image/*" className='hidden' />
              <FiEdit />
            </label>
            {
              previewURL ?
                <div
                  onClick={() => {
                    clear()
                  }}
                  className='absolute bg-red-700 p-1 rounded-full z-30 top-0 right-0 text-sm text-white'>
                  <AiOutlineClose />
                </div> :
                ''
            }
          </div>
          <div className='flex flex-col gap-y-3'>
            <input
              type="text"
              name="fullName"
              value={user?.fullName}
              onChange={handleChange}
              placeholder="Name"
              className='text-xl font-bold rounded-sm focus:border-none block w-full active:border-none'
            />
            <span>{user?.email}</span>
          </div>
        </div>
        <h2 className='text-4xl font-bold mt-6'>Contraseña y autenticación</h2>
        <button className='w-fit px-3 py-1.5 rounded-md bg-[#8DB600] font-bold text-white' onClick={() => setAlertIsHidden(false)}>Cambiar contraseña</button>
      </div>

      <div className={`${hasChanged ? 'flex' : 'hidden'} fixed z-50 bottom-10 left-1/2 -translate-x-1/2 w-3/4 flex items-center justify-between p-4 bg-white text-black rounded-xl border border-black`}>
        <span className='font-bold text-xl'>Cuidado, ¡tienes cambios sin guardar!</span>
        <div className='flex items-center justify-center gap-x-2'>
          <button onClick={clear} className='font-bold hover:underline'>clear</button>
          <button onClick={editUser} className='px-3 py-1.5 rounded-md bg-green-700 font-bold text-white'>Guardar cambios</button>
        </div>
      </div>

      <div className={`${!alertIsHidden ? 'flex' : 'hidden'} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[350px] min-h-[350px] flex flex-col items-center justify-between p-4 text-black rounded-xl border border-black bg-slate-100`}>
        <div onClick={() => setAlertIsHidden(true)} className='absolute top-3 right-3 hover:cursor-pointer text-2xl z-10'>
          <AiOutlineClose />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-bold'>Actualiza tu contraseña</h2>
          <h2 className='text-md text-slate-800'>Introduce tu contraseña actual y una nueva contraseña.</h2>
        </div>
        <div className='flex flex-col items-start w-full gap-y-4 mt-6'>
          {/* <div className='flex flex-col w-full gap-y-2'>
            <label className='text-xs text-slate-800 font-bold' htmlFor="">CONTRASEÑA ACTUAL</label>
            <input type="text" />
          </div> */}
          <div className='flex flex-col w-full gap-y-2'>
            <label className='text-xs text-slate-800 font-bold' htmlFor="">NUEVA CONTRASEÑA</label>
            <input
              type="text"
              name="newPassword"
              value={password}
              onChange={handleChangePassword}
              placeholder="Contraseña"
            />
          </div>
          <div className='flex flex-col w-full gap-y-2'>
            <label className='text-xs text-slate-800 font-bold' htmlFor="">CONFIRMAR NUEVA CONTRASEÑA</label>
            <input
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              placeholder="Confirmar contraseña"
            />
          </div>
        </div>
        <div className='flex items-center justify-end gap-x-3 mt-6 w-full '>
          <button onClick={() => setAlertIsHidden(true)} className='font-bold hover:underline'>Cancelar</button>
          <button onClick={changePassword} className='px-3 py-1.5 rounded-md bg-green-700 font-bold text-white'>Cambiar</button>
        </div>
      </div>
    </div >
  )
}

export default EditProfileView