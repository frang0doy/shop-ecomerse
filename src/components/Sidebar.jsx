import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LenguajeContext'; // Importar el hook de idioma

const Sidebar = ({ cart, isOpen, setIsSidebarOpen, removeFromCart }) => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // Obtener el idioma actual

  // Función para cerrar el sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Función para redirigir al checkout
  const goToCheckout = () => {
    setIsSidebarOpen(false); // Cierra el sidebar antes de navegar
    navigate('/checkout');   // Redirige a la página de checkout
  };

  // Calcular subtotal y total
  const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const total = subtotal;

  // Textos según el idioma
  const texts = {
    es: {
      cartEmpty: 'Tu carrito está vacío',
      remove: 'Eliminar',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Finalizar compra',
    },
    en: {
      cartEmpty: 'Your cart is empty',
      remove: 'Remove',
      subtotal: 'Subtotal',
      total: 'Total',
      checkout: 'Checkout',
    },
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 bg-black bg-opacity-50 z-50 transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeSidebar}
      >
        <div
          className="bg-white w-80 h-full p-4 overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()} // Evita cerrar el sidebar al hacer clic dentro
        >
          <button
            onClick={closeSidebar}
            className="absolute top-4 left-4 text-2xl font-bold text-black"
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold text-center mb-4">Carrito</h2>
          <hr className="mb-4" />

          <div className="mb-8">
            {cart.length === 0 ? (
              <p className="text-center">{texts[language].cartEmpty}</p> // Texto que cambia según el idioma
            ) : (
              cart.map((product) => (
                <div key={product.id} className="flex justify-between items-center mb-4">
                  <div>
                    <p>{product.name}</p>
                    <p>${product.price} x {product.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product)}
                    className="text-red-600 hover:text-red-800 transition-all"
                  >
                    {texts[language].remove} {/* Texto de eliminación dinámico */}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 p-4">
            <hr className="mb-4" />
            <div className="text-lg font-semibold">
              <p className="mb-2">
                {texts[language].subtotal}: ${subtotal.toFixed(2)} {/* Subtotal dinámico */}
              </p>
              <p className="mb-4">
                {texts[language].total}: ${total.toFixed(2)} {/* Total dinámico */}
              </p>
            </div>
            <button
              onClick={goToCheckout}
              className="w-full bg-black text-white p-2 rounded-md hover:bg-rose-700 transition-all"
            >
              {texts[language].checkout} {/* Botón de finalizar compra dinámico */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
