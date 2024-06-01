
import './DashboardView.css';

import Image1 from '../../assets/lugar1.png'; 
import Image2 from '../../assets/lugar2.png'; 
import Image3 from '../../assets/lugar3.png'; 
import Image4 from '../../assets/lugar4.png'; 
import Image5 from '../../assets/lugar5.png'; 


const DashboardView = () => {
  // Array de datos para las tarjetas
  const cards = [
    {
      image: Image1,
      tag: 'Guest favorite',
      title: 'Work cordobes',
      description: 'Colon altura 3200, Córdoba',
      price: '$30000 al mes',
      rating: '⭐ 5.00'
    },
    {
      image: Image2,
      tag: 'Top Choice',
      title: 'Relax and Desing',
      description: 'Ayacucho 123 barrio Alberdi, Córdoba',
      price: '$1500/h por persona incluye merienda',
      rating: '⭐ 4.75'
    },
    {
      image: Image3,
      tag: 'Popular Office',
      title: 'Creative Workshop CBA',
      description: 'Art Lane 456, Villa Maria, Córdoba',
      price: '$45.000 al mes',
      rating: '⭐ 2.95'
    },
    {
    image: Image4,
    tag: 'Trader Office',
    title: 'Private office',
    description: 'Marcelo T de alvear 20, Barrio centro, Córdoba',
    price: '$80.000 al mes',
    rating: '⭐ 4.20'
    },
    {
    image: Image5,
    tag: 'Mozambique Bar',
    title: 'Nature resto',
    description: 'Viamonte 486 Barrio General Paz',
    price: '$15.000 al mes por persona',
    rating: '⭐ 3.95'
    },

    // Agrega más objetos para más tarjetas
  ];

  // Manejador de eventos para el click en la tarjeta
  const handleCardClick = (title: string) => {
    alert(`Card clicked: ${title}`);
  };

  return (
    <div className="dashboard-view">
      <div className="header">
        <input type="text" placeholder="Search" className="search-bar"  />
        <div className="filters">
          <button className="filter-button">Full Nature</button>
          <button className="filter-button">Creativo</button>
          <button className="filter-button">con Resto</button>
          <button className="filter-button">24hs.</button>
          <button className="filter-button">Privado</button>
          <button className="filter-button">Bar Style</button>
          <button className="filter-button">Público</button>
        </div>
      </div>
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index} onClick={() => handleCardClick(card.title)}>
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content">
              <span className="tag">{card.tag}</span>
              <h3 className="title">{card.title}</h3>
              <p className="description">{card.description}</p>
              <p className="price">{card.price}</p>
              <div className="rating">{card.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardView;
