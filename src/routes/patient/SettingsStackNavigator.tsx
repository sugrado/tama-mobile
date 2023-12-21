import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Account from '../../screens/patient/Settings/Account';
import Settings from '../../screens/patient/Settings';
import QRCode from '../../screens/patient/Settings/QRCode';
import MyRelatives from '../../screens/patient/Settings/MyRelatives';
import ChangePassword from '../../screens/common/ChangePassword';
import ChangeEmail from '../../screens/common/ChangeEmail';

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
      name={PAGE_NAMES.PATIENT.SETTINGS.MY_RELATIVES}
      component={MyRelatives}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.CHANGE_PASSWORD}
      component={ChangePassword}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.CHANGE_EMAIL}
      component={ChangeEmail}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.PATIENT.SETTINGS.QR_CODE}
      component={QRCode}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
