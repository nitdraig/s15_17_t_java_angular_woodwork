import '../DashboardView.css';
import { FormattedWorkspace } from '../../../types/Types';
import { Link } from 'react-router-dom';

interface PlacesCardProps {
  workspaces: FormattedWorkspace[];
}

const PlacesCard: React.FC<PlacesCardProps> = ({ workspaces }) => {
  const getRandomRating = (): string => {
    const min = 1.0;
    const max = 5.0;
    const rating = (Math.random() * (max - min) + min).toFixed(2);
    return rating;
  };

  return (
    <div className="card-container">
      {workspaces.map((workspace, index) => (
        <Link to={`/reservation/${workspace.id_workspace}`} key={index} className="card">
          <img src={workspace.image} alt={workspace.title} className="card-image" />
          <div className="card-content">
            <div className="flex justify-between items-center">
              <span className="tag w-auto ml-0 mr-auto px-2">{workspace.tag}</span>
              <div className="rating-container flex items-center ml-4">
                <span role="img" aria-label="star">🌟</span>
                <span className="rating ml-1">{getRandomRating()}</span>
              </div>
            </div>
            <h3 className="title">{workspace.title}</h3>
            <p className="description">{workspace.description}</p>
            <p className="price mt-1">{workspace.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PlacesCard;