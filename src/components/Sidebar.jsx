import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';

const Sidebar = ({ cart, isOpen, setIsSidebarOpen, removeFromCart }) => {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => {
    setCheckoutOpen(true);
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const total = subtotal;

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
              <p className="text-center">Tu carrito está vacío</p>
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
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 p-4">
            <hr className="mb-4" />
            <div className="text-lg font-semibold">
              <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="mb-4">Total: ${total.toFixed(2)}</p>
            </div>
            <button
              onClick={openCheckout}
              className="w-full bg-black text-white p-2 rounded-md hover:bg-rose-700 transition-all"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal isOpen={isCheckoutOpen} closeModal={() => setCheckoutOpen(false)} cart={cart} />
    </>
  );
};

export default Sidebar;
