export interface IRegisterFormInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginFormInput {
  email: string;
  password: string;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  peopleCount: number;
  startTime: Date;
  endTime: Date;
  selectedDay: Date;
  pricePerHour: number;
}

export interface UserI {
  id_user: number;
  email: string;
  fullName: string;
  profilePicture: string;
}

export interface Workspace {
  id_workspace: number;
  openDays: string[];
  openingTime: string;
  closingTime: string;
  workspaceName: string;
  address: string;
  pricePerHour: number;
  description: string;
  capacity: number;
  workspaceImages: string[];
  mainImage: string;
}

export interface FormattedWorkspace {
  id_workspace: number;
  title: string;
  image: string;
  tag: string;
  rating: string;
  description: string;
  price: string;
}
export interface FormattedWorkspace2 {
  id_workspace: number;
  title: string;
  image: string;
  tag: string;
  rating: string;
  description: string;
  price: string;
  reservationDate: Date;
}
export interface WorkspaceDetail extends Workspace {
  // Campo adicional.
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  peopleCount: number;
  startTime: Date;
  endTime: Date;
  selectedDay: Date;
  pricePerHour: number;
}
