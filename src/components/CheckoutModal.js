import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutModal = ({ cart, isOpen, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '' },
    shipping: { address: '', number: '', postalCode: '', city: '', province: '' },
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelectPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleFinalizarCompra = () => {
    setShowSuccessAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000); // Espera 3 segundos antes de recargar
  };

  const isStepCompleted = (step) => {
    if (step === 1) {
      const { name, email, phone } = formData.personal;
      return name && email && phone;
    }
    if (step === 2) {
      const { address, number, postalCode, city, province } = formData.shipping;
      return address && number && postalCode && city && province;
    }
    return false;
  };

  const calcularTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  if (!isOpen) return null; // Si el modal no está abierto, no mostrarlo

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl mx-4 sm:mx-0">
        {/* Alerta de compra exitosa */}
{showSuccessAlert && (
  <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg flex items-center gap-4 shadow-lg animate__animated animate__fadeIn animate__delay-1s">
    <FaCheckCircle className="text-3xl" />
    <span className="font-semibold text-lg">¡Compra finalizada con éxito!</span>
  </div>
)}


        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-600 p-2 rounded-full hover:bg-gray-200"
          >
            X
          </button>

          <div className="flex gap-8">
            {/* Left: Steps */}
            <div className="w-full">
              {/* Step 1: Personal Information */}
              <div className="mb-6 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">1: Datos Personales</h3>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-500 underline decoration-1"
                    >
                      Editar
                    </button>
                  )}
                </div>
                {currentStep === 1 && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      value={formData.personal.name}
                      onChange={(e) => handleInputChange(e, 'personal')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo Electrónico"
                      value={formData.personal.email}
                      onChange={(e) => handleInputChange(e, 'personal')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Teléfono"
                      value={formData.personal.phone}
                      onChange={(e) => handleInputChange(e, 'personal')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    {isStepCompleted(1) && (
                      <button
                        onClick={handleNextStep}
                        className="bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Shipping */}
              <div className="mb-6 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">2: Envío</h3>
                  {currentStep > 2 && (
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-blue-500 underline decoration-1"
                    >
                      Editar
                    </button>
                  )}
                </div>
                {currentStep === 2 && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Dirección"
                      value={formData.shipping.address}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="number"
                      placeholder="Número"
                      value={formData.shipping.number}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Código Postal"
                      value={formData.shipping.postalCode}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="province"
                      placeholder="Provincia"
                      value={formData.shipping.province}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="block w-full mb-2 p-2 border rounded"
                    />
                    {isStepCompleted(2) && (
                      <button
                        onClick={handleNextStep}
                        className="bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Payment */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-xl font-semibold">3: Pago</h3>
                {currentStep === 3 && !selectedPayment && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleSelectPayment('bank')}
                      className="bg-black text-white p-2 rounded hover:bg-gray-800 w-1/2"
                    >
                      Depósito Bancario
                    </button>

                    {/* Button for Mercado Pago with link */}
                    <a
                      href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=YOUR_PREF_ID"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white p-2 rounded hover:bg-gray-800 w-1/2 text-center"
                    >
                      Mercado Pago
                    </a>
                  </div>
                )}
                {selectedPayment === 'bank' && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Información de la cuenta bancaria:</h4>
                    <p>Banco: XYZ</p>
                    <p>Cuenta: 123456789</p>
                    <p>CBU: 09876543211234567890</p>
                    <p>Enviar comprobante de pago al mail : x</p>
                    <button
                      onClick={() => setSelectedPayment(null)}
                      className="text-red-500 mt-4"
                    >
                      Cancelar pago
                    </button>
                  </div>
                )}
                {selectedPayment && (
                  <button
                    onClick={handleFinalizarCompra}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full mt-4"
                  >
                    Finalizar Compra
                  </button>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-1/3">
              <h3 className="text-xl font-semibold">Resumen de la compra</h3>
              <div className="mt-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calcularTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
