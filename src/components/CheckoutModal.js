import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, closeModal, cart }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    identification: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    shipping: {
      address: '',
      number: '',
      postalCode: '',
      city: '',
      province: '',
    },
  });
  const [selectedPayment, setSelectedPayment] = useState(null);

  if (!isOpen) return null;

  const calcularTotal = () => cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  const handleSelectPayment = (method) => {
    setSelectedPayment(method);
  };

  const isStepCompleted = (step) => {
    switch (step) {
      case 1:
        const { firstName, lastName, phone, email } = formData.identification;
        return firstName && lastName && phone && email;
      case 2:
        const { address, number, postalCode, city, province } = formData.shipping;
        return address && number && postalCode && city && province;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-6xl h-full p-6 overflow-y-auto relative flex">
        {/* Close Button */}
        <button onClick={closeModal} className="absolute top-4 right-4 text-2xl font-bold">
          ×
        </button>

        {/* Left: Steps */}
        <div className="w-2/3 pr-6">
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>

          {/* Step 1: Identification */}
          <div className="mb-6 border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">1: Identificación</h3>
              {currentStep > 1 && (
                <button
                  onClick={() => handleEditStep(1)}
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
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.identification.firstName}
                  onChange={(e) => handleInputChange(e, 'identification')}
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.identification.lastName}
                  onChange={(e) => handleInputChange(e, 'identification')}
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.identification.phone}
                  onChange={(e) => handleInputChange(e, 'identification')}
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.identification.email}
                  onChange={(e) => handleInputChange(e, 'identification')}
                  className="block w-full mb-2 p-2 border rounded"
                />
                {isStepCompleted(1) && (
                  <button
                    onClick={handleNextStep}
                    className="bg-black text-white p-2 rounded hover:bg-gray-800"
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
                  onClick={() => handleEditStep(2)}
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
                    className="bg-black text-white p-2 rounded hover:bg-gray-800"
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
                <button
      disabled
      className="bg-gray-300 text-gray-500 p-2 rounded w-1/2 cursor-not-allowed"
      title="Próximamente disponible"
    >
      Mercado Pago
    </button>
              </div>
            )}
            {selectedPayment === 'bank' && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Información de la cuenta bancaria:</h4>
                <p>Banco: XYZ</p>
                <p>Cuenta: 123456789</p>
                <p>CBU: 09876543211234567890</p>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="mt-4 text-blue-500 underline decoration-1"
                >
                  Volver a elegir
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="w-1/3 border p-4 rounded-lg bg-gray-100">
          <h3 className="text-xl font-bold">Resumen de Compra</h3>
          <ul className="mt-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between mb-2">
                <span>{product.name}</span>
                <span>${product.price * product.quantity}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between">
            <strong>Total:</strong>
            <span>${calcularTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
