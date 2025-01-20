import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Popover } from '@headlessui/react';

const Productos = ({ searchTerm, setSearchTerm, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredType, setFilteredType] = useState('Productos');
  const productTypes = ['Sistemas Solares', 'Áticos', 'Inversores Solares', 'Linternas Solares'];

  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', price: 20.99, category: 'Productos', img: '/img/producto1.jpg', link: '/producto1' },
    { id: 2, name: 'Producto 2', price: 15.99, category: 'Productos', img: '/img/producto2.jpg', link: '/producto2' },
    { id: 3, name: 'Sistema Solar 1', price: 100.99, category: 'Sistemas Solares', img: '/img/sistemasolar1.jpg', link: '/sistemasolar1' },
    { id: 4, name: 'Ático Solar 1', price: 150.99, category: 'Áticos', img: '/img/atico1.jpg', link: '/atico1' },
    { id: 5, name: 'Inversor Solar 1', price: 200.99, category: 'Inversores Solares', img: '/img/inversor1.jpg', link: '/inversor1' },
    { id: 6, name: 'Linterna Solar 1', price: 50.99, category: 'Linternas Solares', img: '/img/linterna1.jpg', link: '/linterna1' },
    { id: 7, name: 'Producto 3', price: 20.99, category: 'Productos', img: '/img/producto3.jpg', link: '/producto3' },
    { id: 8, name: 'Producto 4', price: 25.99, category: 'Productos', img: '/img/producto4.jpg', link: '/producto4' },
  ]);

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filteredType === 'Ver todo' || product.category === filteredType)
  );

  const handleFilterChange = (type) => {
    setFilteredType(type);
    setIsOpen(false);
  };

  const rows = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    rows.push(filteredProducts.slice(i, i + 4));
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`El producto ${product.name} ha sido agregado al carrito.`);
  };

  return (
    <section id="productos" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 gap-8">
          <Popover className="relative">
            <Popover.Button
              className="flex items-center gap-x-1 text-lg font-semibold text-black relative group px-4 py-2 bg-white border border-gray-300 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {filteredType}
              <ChevronDownIcon className="h-5 w-5 text-black transition-transform duration-200" aria-hidden="true" />
            </Popover.Button>
            {isOpen && (
              <Popover.Panel className="absolute -left-2 top-full z-10 mt-3 inline-block overflow-hidden rounded-4xl bg-white shadow-lg ring-1 ring-gray-900/5 min-w-[280px]">
                <div className="p-4">
                  {productTypes.map((type) => (
                    <div key={type} onClick={() => handleFilterChange(type)} className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer">
                      <div className="flex-auto">
                        <span className="block font-semibold text-gray-900">{type}</span>
                      </div>
                    </div>
                  ))}
                  <div onClick={() => handleFilterChange('Productos')} className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <div className="flex-auto">
                      <span className="block font-semibold text-gray-900">Ver todos los productos</span>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            )}
          </Popover>

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

        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {row.map((product) => (
              <div key={product.id} className="bg-white shadow-lg overflow-hidden relative rounded-lg flex flex-col items-center group">
                <a href={product.link}>
                  <img src={product.img} alt={product.name} className="w-full h-60 object-contain mb-4" />
                </a>
                <div className="flex flex-col items-center p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <span className="text-gray-500 text-sm mb-4">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mb-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
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
