import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para manejar la navegación

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate(); // Usamos useNavigate

  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };

  const handleFinalizarCompra = () => {
    if (carrito.length > 0) {
      navigate('/checkout'); // Redirige a la página de checkout
    }
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id}>
              <span>{producto.nombre}</span> - {producto.precio}€
            </li>
          ))}
        </ul>
      )}
      <div className="total">
        <h3>Total: {calcularTotal()}€</h3>
      </div>

      <button 
        onClick={handleFinalizarCompra} 
        disabled={carrito.length === 0} // Deshabilita el botón si el carrito está vacío
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default Carrito;
