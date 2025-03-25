import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from './LenguajeContext'; // Importar el hook de idioma

const Footer = () => {
  const { language } = useLanguage(); // Acceder al idioma actual

  // Textos según el idioma
  const texts = {
    es: {
      newsletterTitle: 'Suscríbete a nuestro boletín de noticias',
      newsletterDesc: 'Obtenga las últimas actualizaciones y percepciones entregadas en su bandeja de entrada',
      newsletterButton: 'Enviar', // Agregar texto para el botón en español
      copyright: '© 2024 ProtoNature. Todos los derechos reservados.',
    },
    en: {
      newsletterTitle: 'Subscribe to our newsletter',
      newsletterDesc: 'Get the latest updates and insights delivered to your inbox',
      newsletterButton: 'Submit', // Agregar texto para el botón en inglés
      copyright: '© 2024 ProtoNature. All rights reserved.',
    },
  };

  return (
    <footer id="contact" className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-2">
        {/* Sección superior con el párrafo */}
        <div className="lg:flex lg:items-start lg:gap-18">
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-white">{texts[language].newsletterTitle}</h2>
                <h4 className="mt-4 text-gray-300 text-sm whitespace-nowrap">
                  {texts[language].newsletterDesc}
                </h4>
              </div>
            </div>

            {/* Aquí separo el formulario para que se quede a la parte derecha */}
            <div className="col-span-2 lg:col-span-3 mt-10 lg:mt-0 flex justify-end">
              <form className="w-full lg:w-96">
                <label htmlFor="UserEmail" className="sr-only">Email</label>
                <div className="flex w-full">
                  <input
                    type="email"
                    id="UserEmail"
                    className="w-3/4 px-4 py-2 text-black focus:outline-none focus:ring-0 border-2 border-white rounded-l-full"  // Input más largo
                  />
                  <button
                    className="w-1/4 bg-gray-900 px-6 py-2 text-sm font-semibold text-white transition-none hover:bg-teal-600 border-2 border-white border-l-0 rounded-r-full"  // Botón más corto
                  >
                    {texts[language].newsletterButton} {/* Texto dinámico del botón */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisora inferior con más separación */}
      <div className="mt-8 border-t border-gray-700 py-4">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <p className="text-sm text-gray-300">
            {texts[language].copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
