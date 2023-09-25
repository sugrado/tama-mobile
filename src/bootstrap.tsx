import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

export default function Bootstrap() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
