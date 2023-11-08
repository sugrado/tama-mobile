import React from 'react';
import Navigation from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './contexts/AuthContext';
import SplashScreen from 'react-native-splash-screen';

export default function Bootstrap() {
  return (
    <AuthProvider
      onCheckCompleted={() => {
        SplashScreen.hide();
      }}>
      <SafeAreaProvider>
        <PaperProvider theme={{dark: false}}>
          <Navigation />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
