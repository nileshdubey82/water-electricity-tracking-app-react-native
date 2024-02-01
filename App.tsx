import React from 'react';
import Stack from './components/Navigations/Stack';
import {LanguageProvider} from './services/LanguageContext';
export default function App() {
  return (
    <LanguageProvider>
      {/* <NavigationContainer> */}
      <Stack />
      {/* </NavigationContainer> */}
    </LanguageProvider>
  );
}
