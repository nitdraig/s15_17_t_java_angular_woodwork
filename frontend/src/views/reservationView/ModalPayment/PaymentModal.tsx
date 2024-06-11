import { FC, useState } from 'react';
import { format } from 'date-fns';
import { PaymentModalProps } from '../../../types/Types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentModal: FC<PaymentModalProps> = ({ isOpen, onClose, peopleCount, startTime, endTime, selectedDay, pricePerHour }) => {
  const [form, setForm] = useState({
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({
    cardHolder: false,
    cardNumber: false,
    expirationDate: false,
    cvc: false,
  });

  if (!isOpen) return null;

  const formattedStartTime = format(startTime, 'h:mm aa');
  const formattedEndTime = format(endTime, 'h:mm aa');
  const formattedSelectedDay = format(selectedDay, 'dd/MM/yyyy');
  const totalAmount = (endTime.getHours() - startTime.getHours()) * pricePerHour * peopleCount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = () => {
    const newErrors = {
      cardHolder: form.cardHolder === '',
      cardNumber: form.cardNumber === '',
      expirationDate: form.expirationDate === '',
      cvc: form.cvc === '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (hasErrors) {
      toast.error("Por favor, complete todos los campos obligatorios.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    toast.success("Reserva exitosa!", {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      setForm({
        cardHolder: '',
        cardNumber: '',
        expirationDate: '',
        cvc: '',
      });
      onClose();
    }, 3000);
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white mx-8 px-8 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl max-h-[96vh] overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Opciones de Pago</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre del titular</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={form.cardHolder}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.cardHolder ? 'border-red-500' : ''}`}
                  placeholder="Nombre del titular"
                />
                {errors.cardHolder && <p className="text-red-500 text-sm">*Este campo es requerido</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Número de tarjeta</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.cardNumber ? 'border-red-500' : ''}`}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">*Este campo es requerido</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Fecha de vencimiento</label>
                <input
                  type="text"
                  name="expirationDate"
                  value={form.expirationDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.expirationDate ? 'border-red-500' : ''}`}
                  placeholder="MM/AA"
                />
                {errors.expirationDate && <p className="text-red-500 text-sm">*Este campo es requerido</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={form.cvc}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.cvc ? 'border-red-500' : ''}`}
                  placeholder="123"
                />
                {errors.cvc && <p className="text-red-500 text-sm">*Este campo es requerido</p>}
              </div>
            </div>
            <div className='space-y-6'>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Cantidad de personas:</span>
                <span className="text-gray-700">{peopleCount}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Día seleccionado:</span>
                <span className="text-gray-700">{formattedSelectedDay}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Hora de inicio:</span>
                <span className="text-gray-700">{formattedStartTime}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Hora de fin:</span>
                <span className="text-gray-700">{formattedEndTime}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Precio por Hora x Persona:</span>
                <span className="text-gray-700">${pricePerHour}</span>
              </div>
              <hr className="border-t border-gray-300 my-4" />
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-gray-700">${totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-[#323E1D] text-white hover:bg-[#cb3234] rounded-lg mr-2">Cancelar</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#F9EC34] hover:bg-[#A67C52] text-black hover:text-white rounded-lg">Confirmar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
