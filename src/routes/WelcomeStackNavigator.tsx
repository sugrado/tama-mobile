import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PAGE_NAMES} from '../constants';
import WelcomeScreen from '../screens/WelcomeScreen';
import * as RelativeAuthStack from './relative/AuthStackNavigator';
import * as PatientAuthStack from './patient/AuthStackNavigator';
import * as DoctorAuthStack from './doctor/AuthStackNavigator';
import ForgotPassword from '../screens/ForgotPassword';

const WelcomeStack = createStackNavigator();

const WelcomeStackNavigator = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName={PAGE_NAMES.PORTALS.WELCOME}
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
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.WELCOME}
        component={WelcomeScreen}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.PATIENT}
        component={PatientAuthStack.default}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.DOCTOR}
        component={DoctorAuthStack.default}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.RELATIVE}
        component={RelativeAuthStack.default}
      />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackNavigator;
