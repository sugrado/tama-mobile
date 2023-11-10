import React from 'react';
import Navigation from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './contexts/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import {AxiosInterceptor} from './contexts/AxiosInterceptor';

export default function Bootstrap() {
  const authCheckCompleted = () => {
    SplashScreen.hide();
  };

  return (
    <AuthProvider onCheckCompleted={authCheckCompleted}>
      <AxiosInterceptor>
        <SafeAreaProvider>
          <PaperProvider theme={{dark: false}}>
            <Navigation />
          </PaperProvider>
        </SafeAreaProvider>
      </AxiosInterceptor>
    </AuthProvider>
  );
}
