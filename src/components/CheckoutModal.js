import React from 'react';

const CheckoutModal = ({ isOpen, closeModal, cart }) => {
  if (!isOpen) return null;

  const calcularTotal = () => cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl h-full p-6 overflow-y-auto relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-2xl font-bold">
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <ul className="mb-6">
          {cart.map((product) => (
            <li key={product.id} className="flex justify-between mb-4">
              <span>{product.name}</span>
              <span>${product.price} x {product.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="text-lg font-semibold mb-6">
          <p>Total: ${calcularTotal().toFixed(2)}</p>
        </div>

        <button
          onClick={() => {
            alert('Compra finalizada con éxito');
            closeModal();
          }}
          className="w-full bg-black text-white p-4 rounded-md hover:bg-rose-700 transition-all"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
