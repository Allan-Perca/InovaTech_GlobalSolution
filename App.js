import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { FontProvider } from './src/context/FontContext.js';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <FontProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </FontProvider>
  );
}