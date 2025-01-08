import React, { createContext, useContext, useState } from 'react';

const LenguajeContext = createContext();

export const LenguajeProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'es' ? 'en' : 'es'));
  };

  return (
    <LenguajeContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LenguajeContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LenguajeContext);
};
