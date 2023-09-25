import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './routes/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';

export default function Bootstrap() {
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
