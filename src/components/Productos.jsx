import React, { useState } from 'react';
import { useCarrito } from './CarritoContext'; // Importa el hook del contexto

export default function Productos({ searchTerm }) {
  // Productos de ejemplo (puedes reemplazarlo con datos dinámicos o una API)
  const productos = [
    { id: 1, name: 'D10', price: 120, description: 'Zapatillas deportivas de alta calidad.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd10%2Fd10-1-1.png&w=256&q=75' },
    { id: 2, name: 'D100', price: 50, description: 'Camiseta Nike de algodón cómodo.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd100%2Fd100-1.png&w=256&q=75' },
    { id: 3, name: 'D200', price: 75, description: 'Sudadera Puma ideal para el invierno.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd200%2Fd200-1.png&w=256&q=75' },
    { id: 4, name: 'X100Pro', price: 120, description: 'Zapatillas Adidas con diseño moderno.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx1000%2Fx1000-1.png&w=256&q=75jpg' },
    { id: 5, name: 'X200Pro', price: 50, description: 'Camiseta Nike de algodón cómodo.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx2000%2Fx2000-1.png&w=256&q=75' },
    { id: 6, name: 'X300Pro', price: 75, description: 'Sudadera Puma para el frío.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx3000%2Fx3000-1.png&w=256&q=75' },
    { id: 7, name: 'iMax10 Pro', price: 120, description: 'Zapatillas Adidas para un look casual.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fimax10%2Fimax10-1.jpg&w=640&q=75' },
    { id: 8, name: 'V240S-p', price: 50, description: 'Camiseta Nike con un ajuste perfecto.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv240s-p%2Fv240s-p-1-1.png&w=1080&q=75' },
    { id: 9, name: 'V320S-p', price: 75, description: 'Sudadera Puma para climas fríos.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv320s-p%2Fv320s-p-1-1.png&w=1080&q=75' },
    { id: 10, name: 'SF40', price: 120, description: 'Zapatillas deportivas de alta calidad.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf40%2Fsf40-1.png&w=1080&q=75' },
    { id: 11, name: 'SF50', price: 50, description: 'Camiseta Nike de algodón cómodo.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf50%2Fsf50-1.png&w=1080&q=75' },
    { id: 12, name: 'A2', price: 75, description: 'Sudadera Puma ideal para el invierno.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fa2%2Fa2-1.jpg&w=640&q=75' },
    { id: 13, name: 'S3', price: 120, description: 'Zapatillas Adidas con diseño moderno.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs3%2Fs3-1.jpg&w=640&q=75' },
    { id: 14, name: 'S30', price: 50, description: 'Camiseta Nike de algodón cómodo.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs30%2Fs30-1.jpg&w=640&q=75' },
    { id: 15, name: 'S200', price: 75, description: 'Sudadera Puma para el frío.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs200%2Fs200-1.png&w=640&q=75' },
    { id: 16, name: 'S610', price: 120, description: 'Zapatillas Adidas para un look casual.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs610%2Fs610-2.png&w=640&q=75' },
    { id: 17, name: 'T200', price: 50, description: 'Camiseta Nike con un ajuste perfecto.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200%2Ft200-1.png&w=640&q=75' },
    { id: 18, name: 'T200R', price: 75, description: 'Sudadera Puma para climas fríos.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200r%2Ft200r-1.png&w=640&q=75' },
    { id: 19, name: 'T500R', price: 75, description: 'Sudadera Puma para climas fríos.', image: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft500r%2Ft500r-1.jpg&w=640&q=75' },
  ];

  const [alerta, setAlerta] = useState(null); // Estado para la alerta de producto agregado
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar la mini página
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [cantidad, setCantidad] = useState(1); // Cantidad seleccionada

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usar el contexto para agregar productos al carrito
  const { agregarAlCarrito } = useCarrito();

  // Función para manejar el click en el icono "+" (abrir mini página)
  const handleVerDetalles = (producto) => {
    setSelectedProduct(producto);
    setShowModal(true);
  };

  // Función para manejar el cierre de la mini página
  const handleCerrarModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setCantidad(1);
  };

  // Función para manejar la cantidad seleccionada
  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  // Función para agregar al carrito
  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ ...selectedProduct, cantidad }); // Agregar al carrito con cantidad seleccionada
    setAlerta(`${selectedProduct.name} agregado al carrito`); // Mostrar la alerta
    setTimeout(() => setAlerta(null), 2000); // Ocultar la alerta después de 2 segundos
    handleCerrarModal(); // Cerrar la mini página después de agregar al carrito
  };

  return (
    <div className="container mx-auto p-6">
      {alerta && (
        <div className="alert bg-green-500 text-white p-4 rounded-lg mb-4">
          {alerta}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <div className="grid grid-cols-4 gap-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white border p-4 rounded-lg shadow hover:shadow-lg transition w-full relative"
            >
              <img
                src={producto.image}
                alt={producto.name}
                className="h-48 w-full object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{producto.name}</h3>
              <p className="text-gray-600">${producto.price}</p>
              {/* Botón + centrado en la card */}
              <button
                onClick={() => handleVerDetalles(producto)} // Usar la función con alerta
                className="absolute top-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No se encontraron productos.</p>
        )}
      </div>

      {/* Mini página (Modal) */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 sm:w-1/2 flex relative">
            <div className="w-1/2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-1/2 pl-6">
              {/* Botón de Cierre (X) */}
              <button
                onClick={handleCerrarModal}
                className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-times"></i>
              </button>
              <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>
              <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
              <div className="mt-4">
                <label htmlFor="cantidad" className="block text-gray-600">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  min="1"
                  className="w-16 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleCerrarModal}
                  className="w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  Seguir Viendo
                </button>
                <button
                  onClick={handleAgregarAlCarrito}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
