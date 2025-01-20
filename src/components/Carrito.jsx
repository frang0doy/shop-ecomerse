import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
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

      <Link to="/checkout">
        <button>Finalizar Compra</button>
      </Link>
    </div>
  );
}

export default Carrito;
