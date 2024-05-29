import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginFormInput } from '../../../types/Types';

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" autoComplete="off">
      <div>
        <label htmlFor="email" className="block mb-2 text-base font-medium text-[#31543D]">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "*Email es requerido",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "*Direccion de email no válida"
            },
            maxLength: {
              value: 50,
              message: "*Email no debe exceder 50 caracteres"
            }
          })}
          className={`bg-[#D9D9D9] border ${errors.email ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-base font-medium text-[#31543D]">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "*Contraseña es requerida",
            minLength: {
              value: 6,
              message: "*Contraseña debe tener al menos 6 caracteres"
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
              message: "*Debe contener al menos una mayúscula, un número y un carácter especial"
            }
          })}
          className={`bg-[#D9D9D9] border ${errors.password ? 'border-red-600' : 'border-[#A67C52]'} text-gray-900 sm:text-sm md:text-base rounded-lg focus:ring-[#31543D] focus:border-[#31543D] block w-full p-2.5 shadow-sm`}
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        <div className="mt-2 text-sm text-center text-[#31543D]">
          Olvidaste tu contraseña? <a href="#" className="font-medium text-[#A67C52] hover:underline">Recuperar password</a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#31543D] hover:bg-[#A67C52] focus:ring-4 focus:outline-none focus:ring-[#31543D] font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-150 ease-in-out"
        disabled={!isValid}
      >
        Iniciar Sesión
      </button>

      <div className="text-sm text-center text-[#31543D] mt-4">
        No tienes cuenta? <a href="/register" className="font-medium text-[#A67C52] hover:underline">Registrarse</a>
      </div>
    </form>
  );
};
