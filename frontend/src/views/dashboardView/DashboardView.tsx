import { useEffect, useState } from "react";
import { fetchWorkspaces } from "../../services/Api";
import { Workspace, FormattedWorkspace } from "../../types/Types";
import "./DashboardView.css";
import PlacesCard from "./PlacesCard/PlacesCard";
import DashboardFilter from "../../components/DashboardFilter";

const DashboardView = () => {
  const [workspaces, setWorkspaces] = useState<FormattedWorkspace[]>([]);

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const data: Workspace[] = await fetchWorkspaces();
        const formattedData: FormattedWorkspace[] = data.map(
          (workspace: Workspace) => ({
            id_workspace: workspace.id_workspace,
            title: workspace.workspaceName,
            image: workspace.mainImage,
            tag: workspace.openDays.join(", "),
            rating: `${workspace.pricePerHour} ARS/hr`,
            description: workspace.address,
            price: `${workspace.pricePerHour} ARS/hr`,
          })
        );
        setWorkspaces(formattedData);
      } catch (error) {
        console.error("Error fetching workspaces", error);
      }
    };

    loadWorkspaces();
  }, []);

  return (
    <div className="dashboard-view">
      <DashboardFilter />
      <PlacesCard workspaces={workspaces} />
    </div>
  );
};

export default DashboardView;
