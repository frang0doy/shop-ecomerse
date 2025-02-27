import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Si estás usando react-router para la navegación
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon } from '@heroicons/react/outline';
const CheckoutPage = ({ cart }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    shipping: {
      address: '',
      number: '',
      postalCode: '',
      city: '',
      province: ''
    }
  });
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Función para calcular el total
  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función para manejar el cambio en el formulario
  const handleInputChange = (e, step) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [step]: {
        ...prevState[step],
        [name]: value
      }
    }));
  };

  // Función para cambiar de paso
  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  // Función de validación de correo (opcional)
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Verifica si el paso está completado
  const isStepCompleted = (step) => {
    if (step === 1) {
      const { firstName, lastName, email, phone } = formData.personalInfo;
      return firstName && lastName && email && phone && validateEmail(email); // Validar email
    }
    if (step === 2) {
      const { address, number, postalCode, city, province } = formData.shipping;
      return address && number && postalCode && city && province;
    }
    return true; // Para el paso 3, está siempre completado
  };

  // Finalizar la compra
  const handleFinalizarCompra = () => {
    alert('Compra finalizada');
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-black text-black p-6 shadow-md">
        <h1 className="text-3xl font-semibold text-center">.</h1>
      </header>

      {/* Breadcrumbs */}
      <nav className="bg-white p-4 shadow-md">
        <Link to="/" className="text-blue-500 hover:underline">Seguir comprando</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">Checkout</span>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-12">
        <div className="flex">
          {/* Left: Steps */}
          <div className="w-2/3 pr-6">
            {/* Paso 1: Datos Personales */}
            <div className="mb-8 border p-6 rounded-lg bg-white shadow-md">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-semibold text-gray-700">1: Datos Personales</h3>
    {currentStep > 1 && (
      <>
        {/* Ícono de editar en pantallas pequeñas */}
        <button
          onClick={() => setCurrentStep(1)}
          className="text-black sm:hidden p-2"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        
        {/* Texto "Editar" en pantallas grandes */}
        <button
          onClick={() => setCurrentStep(1)}
          className="text-black underline decoration-1 hidden sm:block"
        >
          Editar
        </button>
      </>
    )}
  </div>
  {currentStep === 1 && (
    <div className="mt-6 space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={formData.personalInfo.firstName}
        onChange={(e) => handleInputChange(e, 'personalInfo')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.personalInfo.lastName}
        onChange={(e) => handleInputChange(e, 'personalInfo')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.personalInfo.email}
        onChange={(e) => handleInputChange(e, 'personalInfo')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={formData.personalInfo.phone}
        onChange={(e) => handleInputChange(e, 'personalInfo')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleNextStep}
        disabled={!isStepCompleted(1)}
        className={`w-full p-4 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!isStepCompleted(1) && 'opacity-50 cursor-not-allowed'}`}
      >
        Continuar
      </button>
    </div>
  )}
</div>

            {/* Paso 2: Dirección de Envío */}
           
<div className="mb-8 border p-6 rounded-lg bg-white shadow-md">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-semibold text-gray-700">2: Dirección de Envío</h3>
    {currentStep > 2 && (
      <>
        {/* Ícono de editar en pantallas pequeñas */}
        <button
          onClick={() => setCurrentStep(2)}
          className="text-black sm:hidden p-2"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        
        {/* Texto "Editar" en pantallas grandes */}
        <button
          onClick={() => setCurrentStep(2)}
          className="text-black underline decoration-1 hidden sm:block"
        >
          Editar
        </button>
      </>
    )}
  </div>
  {currentStep === 2 && (
    <div className="mt-6 space-y-4">
      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.shipping.address}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="number"
        placeholder="Número"
        value={formData.shipping.number}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Código Postal"
        value={formData.shipping.postalCode}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        value={formData.shipping.city}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="province"
        placeholder="Provincia"
        value={formData.shipping.province}
        onChange={(e) => handleInputChange(e, 'shipping')}
        className="block w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleNextStep}
        disabled={!isStepCompleted(2)}
        className={`w-full p-4 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!isStepCompleted(2) && 'opacity-50 cursor-not-allowed'}`}
      >
        Continuar
      </button>
    </div>
  )}
</div>

            {/* Paso 3: Método de Pago */}
            <div className="border p-6 rounded-lg bg-white shadow-md">
  <h3 className="text-xl font-semibold text-gray-700">3: Método de Pago</h3>
  
  {currentStep === 3 && !selectedPayment && (
    <div className="mt-6 flex flex-col sm:flex-row gap-6">
      <button
        onClick={() => setSelectedPayment("bank")}
        className="w-full sm:w-auto p-4 border border-gray-300 text-gray-700 rounded-lg 
                   hover:shadow-md transition-all duration-300 hover:scale-105"
      >
        Depósito Bancario
      </button>
      
      <a
        href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=YOUR_PREF_ID"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto p-4 border border-gray-300 text-gray-700 rounded-lg 
                   hover:shadow-md transition-all duration-300 hover:scale-105 
                   text-center flex items-center justify-center"
      >
        Mercado Pago
      </a>
    </div>
  )}

  {/* Mostrar detalles de depósito bancario */}
  {selectedPayment === "bank" && (
    <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50 transition-all duration-500">
      <h4 className="text-lg font-semibold text-gray-700">Detalles de la cuenta</h4>
      <p className="mt-2 text-gray-600">Banco: Banco Ejemplo</p>
      <p className="text-gray-600">Cuenta: 123456789</p>
      <p className="text-gray-600">CBU: 12345678901234</p>
      <p className="text-gray-600">Alias: ejemplo.alias</p>
      
      <button
        onClick={() => setSelectedPayment(null)}
        className="mt-4 p-2 text-red-500 border border-red-500 rounded-lg 
                   hover:bg-red-100 transition-all duration-300"
      >
        Elegir otro método de pago
      </button>
    </div>
  )}
</div>

          </div>

          {/* Right: Cart */}
          <div className="w-full sm:w-1/3 px-4 sm:px-6">
  <div className="p-6 border rounded-lg shadow-md bg-white">
    <h4 className="text-lg font-semibold text-gray-700 mb-4">Resumen de Compra</h4>
    
    {cart && cart.length > 0 ? (
      cart.map(item => (
        <div key={item.id} className="flex justify-between mb-4">
          <span className="truncate">{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))
    ) : (
      <p className="text-gray-500">Tu carrito está vacío.</p>
    )}
    
    <div className="border-t pt-4">
      <div className="flex justify-between">
        <span>Total:</span>
        <span>${calcularTotal()}</span>
      </div>
    </div>
  </div>
  
  {/* Botón Finalizar Compra siempre debajo del resumen */}
  {selectedPayment && (
  <div className="mt-6">
    <button
      onClick={() => {
        // Mostrar notificación de éxito
        toast.success("¡Compra realizada con éxito!", {
          position: "top-center",
          autoClose: 5000,  // Duración de la notificación en milisegundos
          hideProgressBar: true,
          closeOnClick: true,
        });

        // Redirigir a la página principal después de unos segundos
        setTimeout(() => {
          window.location.href = '/';  // Redirige a la página principal
        }, 3000); // Espera 3 segundos antes de redirigir
      }}
      className="w-full p-4 bg-green-600 text-white rounded-lg 
                 hover:bg-green-700 transition-all duration-300"
    >
      Finalizar Compra
    </button>

  </div>
)}
<ToastContainer />
</div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default CheckoutPage;


