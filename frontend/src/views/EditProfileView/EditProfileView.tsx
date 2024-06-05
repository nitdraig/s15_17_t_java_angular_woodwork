import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// interface Item {
//   id: string;
//   name: string;
//   description: string;
// }

const EditProfileView = () => {

  const { id } = useParams();

  // const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://woodwork.onrender.com/v1/api/user/getUserById/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // const data: Item = await response.json();
        // setItem(data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Detalle del Item</h1>
      <p>ID: {id}</p>
    </div>
  )
}

export default EditProfileView