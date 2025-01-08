import React, { useState } from 'react';
import { useCarrito } from '../components/CarritoContext'; // Ajusta la ruta según corresponda

const CartModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Controlar la visibilidad del carrito
  const { carrito, quitarDelCarrito } = useCarrito(); // Obtienes el carrito y la función para quitar productos

  // Función para manejar el "Seguir viendo"
  const handleContinueShopping = () => {
    window.location.href = '/'; // Redirige a la página de inicio o donde quieras que el usuario continúe comprando
  };

  // Función para manejar el proceso de "Comprar"
  const handleCheckout = () => {
    alert('Iniciando el proceso de compra...');
    // Aquí puedes agregar la lógica para iniciar el proceso de pago
  };

  // Función para abrir/cerrar el carrito
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Carrito Modal (abierto por el ícono del carrito en el header) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-xs bg-gray-800 text-white rounded-t-xl p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Carrito de Compras</h1>
              <button
                onClick={toggleCart}
                className="text-white text-xl font-bold"
              >
                &times; {/* Icono de cerrar */}
              </button>
            </div>

            {carrito.length === 0 ? (
              <p className="text-gray-400 mt-4">El carrito está vacío.</p>
            ) : (
              <ul className="space-y-4 mt-4">
                {carrito.map((producto) => (
                  <li key={producto.id} className="flex items-center justify-between">
                    {/* Imagen pequeña del producto */}
                    <img
                      src={producto.image}  // Asegúrate de que cada producto tenga la propiedad "image"
                      alt={producto.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    
                    {/* Nombre del producto en blanco */}
                    <span className="flex-1 ml-4 text-white">{producto.name}</span>

                    {/* Botón para eliminar el producto */}
                    <button
                      onClick={() => quitarDelCarrito(producto.id)}  // Aquí llamamos la función de quitar
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Botones para continuar viendo o comprar */}
            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={handleContinueShopping}
                className="flex-1 py-2 px-4 bg-gray-600 rounded-md text-white hover:bg-gray-700"
              >
                Seguir viendo
              </button>

              <button
                onClick={handleCheckout}
                className="flex-1 py-2 px-4 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
