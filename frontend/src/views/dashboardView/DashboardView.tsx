import './DashboardView.css';
import PlacesCard from './PlacesCard/PlacesCard';
import DashboardFilter from '../../components/DashboardFilter'; 

const DashboardView = () => {
  return (
    <div className="dashboard-view">
      <div className="header">
        <DashboardFilter /> {/* Completo con barra serch y botones */}
      </div>
      <PlacesCard />
    </div>
  );
}

export default DashboardView;

