
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