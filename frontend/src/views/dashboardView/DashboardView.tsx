import './DashboardView.css';
import PlacesCard from './PlacesCard/PlacesCard';
import DashboardFilter from '../../components/DashboardFilter'; 

const DashboardView = () => {
  return (
    <div className="dashboard-view">
      
      <DashboardFilter /> 
     
      <PlacesCard />
      
    </div>
  );
}

export default DashboardView;

