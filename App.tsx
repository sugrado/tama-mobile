import * as React from 'react';
import 'react-native-gesture-handler';
import Bootstrap from './src/bootstrap';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);
  return <Bootstrap />;
}
