import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Account from '../../screens/patient/Settings/Account';
import Settings from '../../screens/patient/Settings/Settings';
import QRCode from '../../screens/patient/Settings/QRCode';

const SettingsStack = createStackNavigator();

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator
    initialRouteName={PAGE_NAMES.PATIENT.SETTINGS.SETTINGS}
    screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: '#fff',
      cardStyleInterpolator: ({current: {progress}}) => {
        return {
          cardStyle: {
            opacity: progress,
          },
        };
      },
    }}>
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.SETTINGS}
      component={Settings}
      options={{
        headerShown: false,
      }}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.ACCOUNT}
      component={Account}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.QR_CODE}
      component={QRCode}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;