

import './DashboardView.css';
import PlacesCard from './PlacesCard/PlacesCard';

const DashboardView = () => {



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
        <PlacesCard/>
      
    </div>
  );
}

export default DashboardView;
