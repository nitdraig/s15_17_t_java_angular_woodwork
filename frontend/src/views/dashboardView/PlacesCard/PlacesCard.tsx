import { cards } from "../../../services/cardData";


const PlacesCard = () => {
    const handleCardClick = (title: string) => {
        alert(`Card clicked: ${title}`);
      };
    return (
    <div>
      <div className="card-container">
  
  { cards.map((card, index) => (
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
  )
}

export default PlacesCard
