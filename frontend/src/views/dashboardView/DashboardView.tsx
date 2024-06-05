import './DashboardView.css';
import PlacesCard from './PlacesCard/PlacesCard';
import { FaSearch } from 'react-icons/fa';

const DashboardView = () => {
  return (
    <div className="dashboard-view">
      <div className="header">
        <div className="search-bar-container">
          <input type="text" placeholder="" className="search-bar" />
          <button className="search-button"><FaSearch /></button>
        </div>
        <div className="filters-carousel">
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
      </div>
      <PlacesCard />
    </div>
  );
}

export default DashboardView;
