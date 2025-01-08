import React from 'react';
import { useCarrito } from './CarritoContext'; // Importa el hook

const Cart = () => {
  const { carrito, eliminarDelCarrito } = useCarrito(); // Obtener el carrito del contexto

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id} className="flex items-center justify-between p-4 border-b">
              <img src={producto.image} alt={producto.name} className="h-16 w-16 object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{producto.name}</h3>
                <p className="text-gray-600">${producto.price}</p>
              </div>
              <button
                onClick={() => eliminarDelCarrito(producto.id)} // Función para eliminar del carrito
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
