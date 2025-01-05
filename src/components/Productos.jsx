import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const products = [
  { id: 1, name: 'D10', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd10%2Fd10-1-1.png&w=256&q=75' },
  { id: 2, name: 'D100', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd100%2Fd100-1.png&w=256&q=75' },
  { id: 3, name: 'D200', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd200%2Fd200-1.png&w=256&q=75' },
  { id: 4, name: 'X100Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx1000%2Fx1000-1.png&w=256&q=75' },
  { id: 5, name: 'X200Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx2000%2Fx2000-1.png&w=256&q=75' },
  { id: 6, name: 'X300Pro', type: 'Sistemas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx3000%2Fx3000-1.png&w=256&q=75' },
  { id: 7, name: 'iMax10 Pro', type: 'Inversores solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fimax10%2Fimax10-1.jpg&w=640&q=75' },
  { id: 8, name: 'V240S-p', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv240s-p%2Fv240s-p-1-1.png&w=1080&q=75' },
  { id: 9, name: 'V320S-p', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fv320s-p%2Fv320s-p-1-1.png&w=1080&q=75' },
  { id: 10, name: 'SF40', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf40%2Fsf40-1.png&w=1080&q=75' },
  { id: 11, name: 'SF50', type: 'Áticos', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf50%2Fsf50-1.png&w=1080&q=75' },
  { id: 12, name: 'A2', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fa2%2Fa2-1.jpg&w=640&q=75' },
  { id: 13, name: 'S3', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs3%2Fs3-1.jpg&w=640&q=75' },
  { id: 14, name: 'S30', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs30%2Fs30-1.jpg&w=640&q=75' },
  { id: 15, name: 'S200', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs200%2Fs200-1.png&w=640&q=75' },
  { id: 16, name: 'S610', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs610%2Fs610-2.png&w=640&q=75' },
  { id: 17, name: 'T200', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200%2Ft200-1.png&w=640&q=75' },
  { id: 18, name: 'T200R', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200r%2Ft200r-1.png&w=640&q=75' },
  { id: 19, name: 'T500R', type: 'Linternas solares', imageLink: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft500r%2Ft500r-1.jpg&w=640&q=75' },
];

const productTypes = ['Sistemas solares', 'Áticos', 'Linternas solares', 'Inversores solares'];

const Productos = () => {
  const [filteredType, setFilteredType] = useState('Productos');
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isOpen, setIsOpen] = useState(false); // Controlar si el menú está abierto
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  const handleAddToCart = (productId, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity }];
      }
    });
  };

  const handleFilterChange = (type) => {
    setFilteredType(type);
    setIsOpen(false); // Cerrar el menú después de seleccionar una opción
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 0;
      return { ...prevQuantities, [productId]: Math.max(currentQuantity + delta, 1) };
    });
  };

  const filteredProducts = filteredType === 'Productos'
    ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products.filter(product => product.type === filteredType && product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const rows = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    rows.push(filteredProducts.slice(i, i + 4));
  }

  return (
    <section id="productos" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 gap-8">
          {/* Filtro desplegable */}
          <Popover className="relative">
            <Popover.Button
              className="flex items-center gap-x-1 text-lg font-semibold text-black relative group px-4 py-2 bg-white border border-gray-300 rounded-md"
              onClick={() => setIsOpen(!isOpen)} // Toggle del estado del menú
            >
              {filteredType}
              <ChevronDownIcon
                className="h-5 w-5 text-black transition-transform duration-200"
                aria-hidden="true"
              />
            </Popover.Button>

            {isOpen && (
              <Popover.Panel className="absolute -left-2 top-full z-10 mt-3 inline-block overflow-hidden rounded-4xl bg-white shadow-lg ring-1 ring-gray-900/5 min-w-[280px]">
                <div className="p-4">
                  {productTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => handleFilterChange(type)}
                      className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex-auto">
                        <span className="block font-semibold text-gray-900">{type}</span>
                      </div>
                    </div>
                  ))}
                  {/* Botón "Ver todos los productos" */}
                  <div
                    onClick={() => handleFilterChange('Productos')}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-auto">
                      <span className="block font-semibold text-gray-900">Ver todos los productos</span>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            )}
          </Popover>

          {/* Campo de búsqueda */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 w-full sm:w-auto border border-gray-300 rounded-lg shadow-lg text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Filas de productos */}
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {row.map((product) => (
              <div key={product.id} className="bg-white shadow-lg overflow-hidden relative rounded-lg flex flex-col items-center">
                <a href={product.link}>
                  <img
                    src={product.imageLink}
                    alt={product.name}
                    className="w-full h-60 object-contain mb-4" // Imagen centrada y completa
                  />
                </a>
                <div className="flex flex-col items-center p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      className="p-2 bg-gray-300 rounded"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </button>
                    <span>{quantities[product.id] || 1}</span>
                    <button
                      className="p-2 bg-gray-300 rounded"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id, quantities[product.id] || 1)}
                    className="bg-gray-200 text-black py-2 px-6 rounded-md hover:bg-gray-400"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Productos;
