import React from 'react';

const Producto = ({ producto, addToCart }) => {
  return (
    <div className="relative w-64 h-72 flex justify-center items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-transparent">
      <img
        src={producto.img}
        alt={producto.name}
        className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
      />
      <img
        src={producto.img}
        alt={producto.name}
        className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
        <span className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
          {producto.name}
        </span>
      </div>

      {/* Botón para agregar al carrito */}
      <button
        onClick={() => addToCart(producto)}  // Llamamos a la función addToCart
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default Producto;
