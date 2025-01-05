import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const LenguajeContext = createContext();

// Crea el proveedor del contexto
export const LenguajeProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Estado para manejar el idioma

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <LenguajeContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LenguajeContext.Provider>
  );
};

// Hook para usar el contexto
export const useLanguage = () => {
  return useContext(LenguajeContext);
};
