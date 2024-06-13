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
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    cvc: '',
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
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {
      cardHolder: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    };

    // Validar nombre del titular
    if (!/^[a-zA-Z\s]+$/.test(form.cardHolder)) {
      newErrors.cardHolder = 'El nombre del titular solo debe contener letras.';
    }

    // Validar número de tarjeta
    if (!/^\d{16}$/.test(form.cardNumber)) {
      newErrors.cardNumber = 'El número de tarjeta debe contener 16 dígitos.';
    }

    // Validar fecha de vencimiento
    const [month, year] = form.expirationDate.split('/');
    const currentYear = new Date().getFullYear() % 100; // Obtener los dos últimos dígitos del año actual
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expirationDate)) {
      newErrors.expirationDate = 'La fecha de vencimiento debe estar en formato MM/AA.';
    } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      newErrors.expirationDate = 'La fecha de vencimiento no puede ser anterior a la fecha actual.';
    } else if (expYear > currentYear + 6 || (expYear === currentYear + 6 && expMonth > currentMonth)) {
      newErrors.expirationDate = 'La fecha de vencimiento no puede ser superior a 6 años desde la fecha actual.';
    }

    // Validar CVC
    if (!/^\d{3}$/.test(form.cvc)) {
      newErrors.cvc = 'El CVC debe contener 3 dígitos numéricos.';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Por favor, corrija los errores en el formulario.", {
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
                {errors.cardHolder && <p className="text-red-500 text-sm">{errors.cardHolder}</p>}
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
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
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
                {errors.expirationDate && <p className="text-red-500 text-sm">{errors.expirationDate}</p>}
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
                {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
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
