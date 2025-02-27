import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productos = ({ searchTerm, setSearchTerm, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Filtrar por');

  const [products, setProducts] = useState([
    { id: 1, name: 'D10', price: 20.99, category: 'Sistemas Solares', characteristic: 'Popular', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd10%2Fd10-1-1.png&w=1080&q=75', link: '/producto1' },
    { id: 2, name: 'D100', price: 15.99, category: 'Sistemas Solares', characteristic: 'Económico', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd100%2Fd100-1.png&w=1080&q=75', link: '/producto2' },
    { id: 3, name: 'D200', price: 100.99, category: 'Sistemas Solares', characteristic: 'Ecológico', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fd200%2Fd200-1.png&w=256&q=75', link: '/sistemasolar1' },
    { id: 4, name: 'X100Pro', price: 150.99, category: 'Sistemas Solares', characteristic: 'Moderno', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx1000%2Fx1000-1.png&w=256&q=75', link: '/atico1' },
    { id: 5, name: 'X200Pro', price: 200.99, category: 'Sistemas Solares', characteristic: 'Duradero', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx2000%2Fx2000-1.png&w=256&q=75', link: '/inversor1' },
    { id: 6, name: 'X300Pro', price: 50.99, category: 'Sistemas Solares', characteristic: 'Compacta', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fx3000%2Fx3000-1.png&w=256&q=75', link: '/linterna1' },
    { id: 7, name: 'i Max10 Pro', price: 20.99, category: 'Inversores Solares', characteristic: 'Innovador', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fimax10%2Fimax10-1.jpg&w=640&q=75', link: '/producto3' },
    { id: 8, name: 'SF 40', price: 25.99, category: 'Áticos', characteristic: 'Compacto', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf40%2Fsf40-1.png&w=1080&q=75', link: '/producto4' },
    { id: 9, name: 'SF 50', price: 29.99, category: 'Áticos', characteristic: 'Fácil de usar', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fsf50%2Fsf50-1.png&w=1080&q=75', link: '/producto5' },
    { id: 10, name: 'A2', price: 110.99, category: 'Linternas Solares', characteristic: 'Eficiente', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fa2%2Fa2-1.jpg&w=640&q=75', link: '/sistemasolar2' },
    { id: 11, name: 'S3', price: 160.99, category: 'Linternas Solares', characteristic: 'Espacioso', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs3%2Fs3-1.jpg&w=640&q=75', link: '/atico2' },
    { id: 12, name: 'S30', price: 210.99, category: 'Linternas Solares', characteristic: 'Potente', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs30%2Fs30-1.jpg&w=640&q=75', link: '/inversor2' },
    { id: 13, name: 'S200', price: 60.99, category: 'Linternas Solares', characteristic: 'Ligera', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs200%2Fs200-1.png&w=640&q=75', link: '/linterna2' },
    { id: 14, name: 'S610', price: 35.99, category: 'Linternas Solares', characteristic: 'Resistente', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Fs610%2Fs610-2.png&w=640&q=75', link: '/producto6' },
    { id: 15, name: 'T200', price: 40.99, category: 'Linternas Solares', characteristic: 'Económico', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200%2Ft200-1.png&w=640&q=75', link: '/producto7' },
    { id: 16, name: 'T200R', price: 45.99, category: 'Linternas Solares', characteristic: 'Diseño único', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft200r%2Ft200r-1.png&w=640&q=75', link: '/producto8' },
    { id: 17, name: 'T500R', price: 50.99, category: 'Linternas Solares', characteristic: 'Versátil', img: 'https://www.dlight.com/_next/image?url=%2Fnew%2Fimages%2Fproducts%2Ft500r%2Ft500r-1.jpg&w=640&q=75', link: '/producto9' },
  ]);

  // Ordenar productos basado en la opción seleccionada
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'Mayor a menor') {
      return b.price - a.price;
    } else if (sortOption === 'Menor a mayor') {
      return a.price - b.price;
    } else if (sortOption === 'A-Z') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsOpen(false);
  };

  const rows = [];
  for (let i = 0; i < sortedProducts.length; i += 4) {
    rows.push(sortedProducts.slice(i, i + 4));
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito con éxito!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <section id="productos" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 gap-8">
          <div className="relative">
            <button
              className="flex items-center gap-x-1 text-lg font-semibold text-black relative group px-4 py-2 bg-white border border-gray-300 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {sortOption}
              <ChevronDownIcon className="h-5 w-5 text-black transition-transform duration-200" aria-hidden="true" />
            </button>
            {isOpen && (
              <div className="absolute -left-2 top-full z-10 mt-3 overflow-hidden rounded-4xl bg-white shadow-lg ring-1 ring-gray-900/5 min-w-[280px]">
                <div className="p-4">
                  <div
                    onClick={() => handleSortChange('Mayor a menor')}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="block font-semibold text-gray-900">Mayor a menor</span>
                  </div>
                  <div
                    onClick={() => handleSortChange('Menor a mayor')}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="block font-semibold text-gray-900">Menor a mayor</span>
                  </div>
                  <div
                    onClick={() => handleSortChange('A-Z')}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="block font-semibold text-gray-900">A-Z</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full sm:w-auto border border-gray-300 rounded-lg shadow-lg text-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
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
                    className="w-full mt-4 bg-black text-white px-6 py-2 rounded-md shadow-lg hover:bg-gray-800"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Contenedor para los Toasts */}
        <ToastContainer />
      </div>
    </section>
  );
};

export default Productos;
