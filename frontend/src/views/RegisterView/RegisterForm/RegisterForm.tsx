import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterFormInput } from '../../../types/Types';

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<IRegisterFormInput>({ mode: 'onChange' });

  const password = watch("password", "");

  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-4" autoComplete="off">
      <div className="w-full">
        <label htmlFor="fullName" className="block mb-2 text-base font-medium text-[#31543D]">Nombre Completo</label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "*Nombre Completo es requerido",
            minLength: { value: 3, message: "*Nombre Completo debe tener al menos 3 caracteres" },
            maxLength: { value: 50, message: "*Nombre Completo no debe exceder 50 caracteres" }
          })}
          className={`bg-[#D9D9D9] border ${errors.fullName ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="email" className="block mb-2 text-base font-medium text-[#31543D]">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "*Email es requerido",
            pattern: { value: /^\S+@\S+$/i, message: "*Dirección de email no válida" },
            maxLength: { value: 50, message: "*Email no debe exceder 50 caracteres" }
          })}
          className={`bg-[#D9D9D9] border ${errors.email ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="password" className="block mb-2 text-base font-medium text-[#31543D]">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "*Contraseña es requerida",
            minLength: { value: 6, message: "*Contraseña debe tener al menos 6 caracteres" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
              message: "*Debe contener al menos una mayúscula, un número y un carácter especial"
            }
          })}
          className={`bg-[#D9D9D9] border ${errors.password ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="confirmPassword" className="block mb-2 text-base font-medium text-[#31543D]">Repetir Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "*Por favor, confirme su contraseña",
            validate: value => value === password || "Contraseñas no coinciden"
          })}
          className={`bg-[#D9D9D9] border ${errors.confirmPassword ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <div className="mt-16">
        <button
          type="submit"
          className="w-full text-white bg-[#31543D] hover:bg-[#A67C52] focus:ring-4 focus:outline-none focus:ring-[#31543D] font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
          disabled={!isValid}
        >
          Registrar
        </button>
      </div>
    </form>
  );
};
