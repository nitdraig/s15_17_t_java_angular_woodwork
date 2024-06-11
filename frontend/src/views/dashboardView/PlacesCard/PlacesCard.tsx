import { cards } from "../../../services/cardData";
import '../DashboardView.css'; // Importamos el CSS aquí

const PlacesCard = () => {
  const handleCardClick = (title: string) => {
    alert(`Card clicked: ${title}`);
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <div className="card" key={index} onClick={() => handleCardClick(card.title)}>
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-content">
            <div className="flex">
              <span className="tag">{card.tag}</span>
              <div className="ml-auto">{card.rating}</div>
            </div>
            <h3 className="title">{card.title}</h3>
            <p className="description">{card.description}</p>
            <p className="price">{card.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesCard;
