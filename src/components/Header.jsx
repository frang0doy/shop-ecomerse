import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from './LenguajeContext'; // Contexto de idioma

export default function Header({ cart, setIsSidebarOpen }) {
  const [scrolling, setScrolling] = useState(0);
  const [bgColor, setBgColor] = useState('transparent');
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setScrolling(opacity);
      setBgColor(scrollPosition > window.innerHeight * 0.6 ? 'bg-black' : 'transparent');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${bgColor}`}
      style={{
        boxShadow: scrolling > 0 ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <img alt="Logo" src="/logo512.png" className="h-8 w-auto" />
          </a>
        </div>

        {/* Íconos alineados a la derecha */}
        <div className="flex items-center space-x-4">
          {/* Botón de cambio de idioma */}
          <button
            onClick={toggleLanguage}
            className="text-white text-sm font-semibold py-2 px-4 cursor-pointer hover:text-indigo-600 transition-all"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Icono del carrito */}
          <div className="relative">
            <button
              onClick={() => setIsSidebarOpen(true)} // Aquí se llama la función que se pasó como prop
              className="text-white flex items-center"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Dropdown del carrito */}
            {showCartDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
                <h3 className="font-bold text-lg">Tu carrito</h3>
                {cart.length > 0 ? (
                  <ul className="mt-2">
                    {cart.map((item, index) => (
                      <li key={index} className="flex justify-between items-center mb-2">
                        <span>{item.name}</span>
                        <span className="text-sm text-gray-500">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Tu carrito está vacío</p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
