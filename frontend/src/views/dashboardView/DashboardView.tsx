import './DashboardView.css';
import PlacesCard from './PlacesCard/PlacesCard';
import DashboardFilter from '../../components/DashboardFilter'; // Asegúrate de importar el DashboardFilter

const DashboardView = () => {
  return (
    <div className="dashboard-view">
      <div className="header">
        <DashboardFilter /> {/* Usar el DashboardFilter aquí */}
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
