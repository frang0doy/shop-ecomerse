import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const CarritoContext = createContext();

// Componente proveedor que envuelve a tus componentes hijos
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  // Función para quitar del carrito
  const quitarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para usar el carrito
export const useCarrito = () => {
  return useContext(CarritoContext);
};
