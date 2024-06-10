import { useForm } from "react-hook-form";
interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = (data: ContactFormInputs) => {
    data;
    alert("Mensaje enviado");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Tu Nombre
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              {...register("name", { required: "Nombre es requerido" })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8DB600] focus:border-[#8DB600] sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-900">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Tu Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo electrónico inválido",
                },
              })}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8DB600] focus:border-[#8DB600] sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-900">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-black"
          >
            Tu Mensaje
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              {...register("message", { required: "Mensaje es requerido" })}
              rows={4}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8DB600] focus:border-[#8DB600] sm:text-sm"
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-900">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center transition duration-150 ease-in-out py-2 px-6 rounded-lg border border-transparent  shadow-sm text-base font-medium text-white bg-[#8DB600] hover:bg-[#A67C52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8DB600]"
          >
            Enviar mensaje
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
