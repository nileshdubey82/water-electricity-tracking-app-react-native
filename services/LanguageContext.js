/* eslint-disable prettier/prettier */
// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
import i18n from './i18next'; 
const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };


  const value = {
    currentLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
