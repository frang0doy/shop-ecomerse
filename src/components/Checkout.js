import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [email, setEmail] = useState('');
  const [mostrarCampos, setMostrarCampos] = useState(false);

  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(storedCarrito);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      alert("Por favor, ingrese su correo electrónico.");
      return;
    }
    setMostrarCampos(true);  // Mostrar campos adicionales
  };

  const handleFinalizarCompra = () => {
    alert('Compra finalizada con éxito!');
    // Aquí podrías hacer un redireccionamiento o guardar la compra.
    // Por ejemplo, vaciar el carrito:
    localStorage.removeItem('carrito');
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };

  return (
    <div className="checkout-container">
      <h2>Resumen de Compra</h2>

      <div className="resumen-compra">
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id}>
              <span>{producto.nombre}</span> - {producto.precio}€
            </li>
          ))}
        </ul>
        <div className="total">
          <h3>Total: {calcularTotal()}€</h3>
        </div>
      </div>

      {!mostrarCampos ? (
        <div className="email-form">
          <h3>Ingresa tu correo electrónico para continuar</h3>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo electrónico"
            />
            <button type="submit">Continuar</button>
          </form>
        </div>
      ) : (
        <div className="formulario-finalizacion">
          <h3>Rellena los siguientes datos para finalizar tu compra</h3>
          <form onSubmit={handleFinalizarCompra}>
            {/* Aquí puedes agregar más campos si es necesario */}
            <button type="submit">Finalizar Compra</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
