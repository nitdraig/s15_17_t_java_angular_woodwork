import ReservationsUser from "./Components/ReservationsUser";
import UserDescription from "./Components/UserDescription";
import { fetchWorkspaces } from "../../services/Api";
import { Workspace, FormattedWorkspace2 } from "../../types/Types";
import { useEffect, useState } from "react";

const EditProfileView = () => {
  const [workspaces, setWorkspaces] = useState<FormattedWorkspace2[]>([]);
  const getRandomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 5, 30);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  const getRandomReservations = (
    workspaces: FormattedWorkspace2[],
    num: number
  ): FormattedWorkspace2[] => {
    const shuffled = workspaces.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const data: Workspace[] = await fetchWorkspaces();
        const formattedData: FormattedWorkspace2[] = data.map(
          (workspace: Workspace) => ({
            id_workspace: workspace.id_workspace,
            title: workspace.workspaceName,
            image: workspace.mainImage,
            tag: workspace.openDays.join(", "),
            rating: `${workspace.pricePerHour} ARS/hr`,
            description: workspace.address,
            price: `${workspace.pricePerHour} ARS/hr`,
            reservationDate: getRandomDate(),
          })
        );
        const randomWorkspaces = getRandomReservations(formattedData, 5);
        setWorkspaces(randomWorkspaces);
      } catch (error) {
        console.error("Error fetching workspaces", error);
      }
    };

    loadWorkspaces();
  }, []);

  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-full max-w-md bg-white shadow-lg rounded-xl p-4">
          <UserDescription />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-4 text-center underline ">
          Tus anteriores reservas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReservationsUser workspaces={workspaces} />
        </div>
      </div>
    </section>
  );
};

export default EditProfileView;
