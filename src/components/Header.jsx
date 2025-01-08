import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLanguage } from './LenguajeContext'; // Importa el hook para manejar el lenguaje

// Componente de alerta
function Alerta({ mensaje, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mensaje) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Cierra la alerta después de 3 segundos
      }, 3000); // La alerta se cierra después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [mensaje, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-96 p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-between space-x-4">
      <span className="flex-1 text-center">{mensaje}</span>
      <button onClick={() => setVisible(false)} className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function Header() {
  const [scrolling, setScrolling] = useState(0);
  const [bgColor, setBgColor] = useState("transparent");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage(); // Usa el contexto de lenguaje

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.min(scrollPosition / 300, 1);
      setScrolling(opacity);
      setBgColor(scrollPosition > window.innerHeight * 0.6 ? "bg-black" : "transparent");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${bgColor}`}
      style={{
        boxShadow: scrolling > 0 ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      {/* Alerta */}
      {/* Puedes usar la alerta aquí si es necesario */}
      {/* <Alerta mensaje={mensaje} onClose={() => setMensaje(null)} /> */}

      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <img alt="Logo" src="/logo512.png" className="h-8 w-auto" />
          </a>
        </div>

        {/* Botón de cambio de idioma */}
        <button
          onClick={toggleLanguage}
          className="text-white text-sm font-semibold py-2 px-4 cursor-pointer hover:text-indigo-600 transition-all"
        >
          {language === "es" ? "EN" : "ES"}
        </button>

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
                className={`fixed top-0 right-0 w-[300px] h-full bg-black text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${
                  mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
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
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
