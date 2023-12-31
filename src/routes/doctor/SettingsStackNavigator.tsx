import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Account from '../../screens/doctor/Settings/Account';
import Settings from '../../screens/doctor/Settings';
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
      name={PAGE_NAMES.DOCTOR.SETTINGS.SETTINGS}
      component={Settings}
      options={{
        headerShown: false,
      }}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.DOCTOR.SETTINGS.ACCOUNT}
      component={Account}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.DOCTOR.SETTINGS.CHANGE_PASSWORD}
      component={ChangePassword}
    />
    <SettingsStack.Screen
      name={PAGE_NAMES.DOCTOR.SETTINGS.CHANGE_EMAIL}
      component={ChangeEmail}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
