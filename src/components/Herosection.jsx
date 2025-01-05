import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Asegúrate de tener el ícono correcto
import { useLanguage } from './LenguajeContext'; // Asegúrate de que este archivo existe y tiene el contexto de idioma

export default function HeroSection() {
  // Estado para manejar la posición del scroll
  const [scrollPosition, setScrollPosition] = useState(0);

  // Hook useEffect para escuchar el desplazamiento del scroll
  useEffect(() => {
    const handleScroll = () => {
      // Usar requestAnimationFrame para mejorar el rendimiento
      window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Obtener el idioma actual desde el contexto
  const { language } = useLanguage();

  // Contenido para español e inglés
  const texts = {
    heading: {
      es: "ADQUIERA SOLUCIONES AL SERVICIO DE SU LIBERTAD",
      en: "ACQUIRE SOLUTIONS AT THE SERVICE OF YOUR FREEDOM"
    },
    subheading: {
      es: "Soluciones energéticas innovadoras para un futuro más limpio y eficiente.",
      en: "Innovative energy solutions for a cleaner and more efficient future."
    }
  };

  // Estilos para el texto con desplazamiento
  const textStyle = {
    transform: `translateY(${scrollPosition * 0.3}px)`, // Los textos se mueven un 30% de la velocidad de desplazamiento
    opacity: Math.min(1, 1 - scrollPosition / 400), // Desvanecer el texto a medida que se hace scroll
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out', // Agregar una transición suave
  };

  // Estilos para los botones con desplazamiento
  const buttonStyle = {
    transform: `translateY(${scrollPosition * 0.5}px)`, // Los botones se mueven un 50% de la velocidad de desplazamiento
    opacity: Math.min(1, 1 - scrollPosition / 300), // Desvanecer los botones a medida que se hace scroll
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out', // Agregar una transición suave
  };

  // Estilos para móviles (desactivar parallax)
  const mobileTextStyle = {
    ...textStyle,
    transform: 'translateY(0)', // Desactivar el parallax en móviles
  };

  const mobileButtonStyle = {
    ...buttonStyle,
    transform: 'translateY(0)', // Desactivar el parallax en móviles
  };

  // Función para el scroll hacia abajo
  const handleScrollDown = () => {
    const nextSection = document.getElementById('productos');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // La imagen de fondo se queda fija
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div>
          <h1
            className="text-3xl font-extrabold sm:text-5xl lg:text-5xl"
            style={window.innerWidth < 640 ? mobileTextStyle : textStyle}
          >
            {language === 'es' ? texts.heading.es : texts.heading.en}
          </h1>
  
          <p
            className="mt-4 text-sm sm:text-2xl lg:text-4xl xl:text-3xl text-white"
            style={window.innerWidth < 640 ? mobileTextStyle : textStyle}
          >
            {language === 'es' ? texts.subheading.es : texts.subheading.en}
          </p>
        </div>
      </div>

      {/* Flecha hacia abajo centrada */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={handleScrollDown}>
        <ChevronDownIcon className="h-12 w-12 text-white animate-bounce" />
      </div>
    </section>
  );
}
