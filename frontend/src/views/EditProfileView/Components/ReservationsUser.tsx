import React from "react";
import { FormattedWorkspace2 } from "../../../types/Types";

interface PlacesCardProps {
  workspaces: FormattedWorkspace2[];
}

const WorkspaceCard: React.FC<{
  workspace: FormattedWorkspace2;
}> = ({ workspace }) => {
  const reservationDate = new Date(workspace.reservationDate);
  const formattedDate = reservationDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative flex flex-col w-full max-w-[38rem] rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative w-full overflow-hidden rounded-t-xl bg-white bg-clip-border text-gray-700">
        <img
          src={workspace.image || "default-image-url.jpg"}
          alt={workspace.title || "Workspace Image"}
          className="h-48 w-full object-cover hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>
      <div className="p-6">
        <h6 className="mb-4 block text-2xl font-sans font-semibold uppercase leading-relaxed tracking-normal text-[#8DB600] antialiased">
          {workspace.title || "Untitled Workspace"}
        </h6>
        <h5 className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {workspace.description || "No description available"}
        </h5>
        <p className="mb-8 block  font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Reservaste este espacio.
          <br /> El día:
          <span className="text-center font-bold">{formattedDate}.</span>
        </p>
        <button
          className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#323E1D] transition-all hover:bg-[#8DB600]/10 active:bg-[#8DB600]/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Ver detalles
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ReservationsUser: React.FC<PlacesCardProps> = ({ workspaces }) => {
  return (
    <>
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id_workspace} workspace={workspace} />
      ))}
    </>
  );
};

export default ReservationsUser;
