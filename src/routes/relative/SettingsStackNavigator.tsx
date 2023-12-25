import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Account from '../../screens/relative/Settings/Account';
import Settings from '../../screens/relative/Settings';
import ChangePassword from '../../screens/common/ChangePassword';
import ChangeEmail from '../../screens/common/ChangeEmail';
import ScanQRCode from '../../screens/relative/Settings/ScanQRCode';

const SettingsStack = createStackNavigator();

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator
    initialRouteName={PAGE_NAMES.RELATIVE.SETTINGS.SETTINGS}
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
      name={PAGE_NAMES.RELATIVE.SETTINGS.SETTINGS}
      component={Settings}
      options={{
        headerShown: false,
      }}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.RELATIVE.SETTINGS.ACCOUNT}
      component={Account}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.RELATIVE.SETTINGS.CHANGE_PASSWORD}
      component={ChangePassword}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.RELATIVE.SETTINGS.CHANGE_EMAIL}
      component={ChangeEmail}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.RELATIVE.SETTINGS.SCAN_QR_CODE}
      component={ScanQRCode}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
