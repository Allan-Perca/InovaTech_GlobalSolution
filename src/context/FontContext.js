import React, { createContext, useContext } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <FontContext.Provider value={true}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  return useContext(FontContext);
};
