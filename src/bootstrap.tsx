import React from 'react';
import Navigation from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './contexts/AuthContext';

export default function Bootstrap() {
  React.useEffect(() => {
    // TODO: async Token expiry check and refresh token request if needed
    SplashScreen.hide();
  }, []);
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
