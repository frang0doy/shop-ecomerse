import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from './LenguajeContext';

export default function Header({ setSearchTerm }) {
  const [scrolling, setScrolling] = useState(0);
  const [bgColor, setBgColor] = useState('transparent');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setScrolling(opacity);

      if (scrollPosition > window.innerHeight * 0.6) {  
        setBgColor('bg-black');
      } else {
        setBgColor('transparent');
      }
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
        {/* Logo a la izquierda */}
        <div className="flex flex-shrink-0">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <img alt="Logo" src="/logo512.png" className="h-8 w-auto" />
          </a>
        </div>

        {/* Íconos de carrito y cambio de idioma a la derecha */}
        <div className="flex items-center space-x-4">
          <ShoppingCartIcon className="h-6 w-6 text-white cursor-pointer hover:text-indigo-600 transition-all" />
          <button
            onClick={toggleLanguage}
            className="text-white text-sm font-semibold py-2 px-4 cursor-pointer hover:text-indigo-600 transition-all"
          >
            {language === 'es' ? 'IN' : 'ES'}
          </button>
        </div>

        {/* Menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {mobileMenuOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
              <div
                className={`fixed top-0 right-0 w-[300px] h-full bg-black text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <a href="#" className="-m-1.5 p-1.5">
                    <img alt="Logo" src="/logo512.png" className="h-8 w-auto" />
                  </a>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white p-2"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-end mt-auto space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <ShoppingCartIcon className="h-6 w-6 text-white cursor-pointer hover:text-indigo-600 transition-all" />
                    <button
                      onClick={toggleLanguage}
                      className="text-white text-sm font-semibold py-2 px-4 cursor-pointer hover:text-indigo-600 transition-all"
                    >
                      {language === 'es' ? 'IN' : 'ES'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
