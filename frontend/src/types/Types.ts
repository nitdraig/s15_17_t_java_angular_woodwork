
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