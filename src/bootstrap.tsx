import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './routes/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function Bootstrap() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
