import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <SafeAreaProvider>
      <StatusBar style='light' />
      <AppNavigation />
    </SafeAreaProvider>
  );
}

