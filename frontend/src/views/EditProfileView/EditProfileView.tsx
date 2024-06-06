import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";

interface UserI {
  id: string;
  name: string;
  description: string;
  image: string;
  username: string;
}

const EditProfileView = () => {

  const { id } = useParams();

  const initialData: UserI = {
    id: "455f54f5fwq43tf343f5",
    name: "Fabian Carabajal",
    description: "Descripción de prueba",
    image: "",
    username: "fabio123"
  };

  // const [item, setItem] = useState<Item | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserI>(initialData);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState<string>('');

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`https://woodwork.onrender.com/v1/api/user/getUserById/${id}`);
    //     console.log(response);
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     // const data: Item = await response.json();
    //     // setItem(data);
    //   } catch (error: any) {
    //     console.log(error);
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();

  }, [id]);

  useEffect(() => {
    const dataHasChanged = Object.keys(initialData).some(
      key => user[key as keyof UserI] !== initialData[key as keyof UserI]
    );

    setHasChanged(dataHasChanged);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
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

  const reestablecer = () => {
    setPreviewURL("")
    setSelectedFile(undefined)
    setUser(initialData)
  }

  // if (loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className='m-8 relative h-screen'>
      <div className='flex items-center justify-between gap-x-6'>
        <div className='w-1/2 flex items-center gap-x-3 border rounded-lg p-4'>
          <div className='group relative w-20 h-20 rounded-full bg-white flex items-center justify-center hover:cursor-pointer'>
            {
              previewURL ? (
                <img src={previewURL} alt="Previsualización" className='rounded-full w-full object-fit' />
              ) :
                <div className='w-20 h-20 rounded-full flex items-center justify-center'>
                  <div className='rounded-full w-full h-full bg-[#8DB600] text-white flex items-center justify-center text-5xl'>
                    {user?.name.split(' ')[0].charAt(0)}{user?.name.split(' ')[0].charAt(1)}
                  </div>
                </div>
            }
            <label htmlFor="fileInput" className='absolute hidden bg-black/50 w-full h-full rounded-full gap-x-1 text-3xl group-hover:flex group-hover:items-center group-hover:justify-center hover:cursor-pointer text-white'>
              <input name='image' id="fileInput" type="file" onChange={handleFileChange} accept="image/*" className='hidden' />
              <FiEdit />
            </label>
            {
              previewURL ?
                <div
                  onClick={() => {
                    reestablecer()
                  }}
                  className='absolute bg-red-700 p-1 rounded-full z-30 top-0 right-0 text-sm text-white'>
                  <AiOutlineClose />
                </div> :
                ''
            }
          </div>
          <div className='flex flex-col'>
            <span className='font-bold text-xl'>{user?.name}</span>
            <span>{user?.username}</span>
          </div>
        </div>
        <form className='bg-white w-1/2 flex flex-col space-y-4 md:space-y-4'>
          <input
            type="text"
            name="name"
            value={user?.name}
            onChange={handleChange}
            placeholder="Name"
            className='text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm'
          />
          <input
            type="text"
            name="description"
            value={user?.description}
            onChange={handleChange}
            placeholder="Description"
            className='text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm'
          />
          <input
            type="text"
            name="username"
            value={user?.username}
            onChange={handleChange}
            placeholder="Username"
            className='text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm'
          />
        </form >
      </div>
      <div className={`${hasChanged ? 'flex' : 'hidden'} fixed z-50 bottom-10 left-1/2 -translate-x-1/2 w-3/4 flex items-center justify-between p-4 bg-white text-black rounded-xl border border-black`}>
        <span className='font-bold text-xl'>Cuidado, ¡tienes cambios sin guardar!</span>
        <div className='flex items-center justify-center gap-x-2'>
          <button onClick={reestablecer} className='font-bold hover:underline'>Reestablecer</button>
          <button className='px-3 py-1.5 rounded-md bg-green-700 font-bold text-white'>Guardar cambios</button>
        </div>
      </div>
    </div >
  )
}

export default EditProfileView