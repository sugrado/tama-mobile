import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PAGE_NAMES} from '../constants';
import WelcomeScreen from '../screens/WelcomeScreen';
import * as PatientRelativeAuthStack from './patient-relative/AuthStackNavigator';
import * as PatientAuthStack from './patient/AuthStackNavigator';
import * as DoctorAuthStack from './doctor/AuthStackNavigator';

const WelcomeStack = createStackNavigator();

const WelcomeStackNavigator = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName={PAGE_NAMES.AUTH.LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.PATIENT}
        component={PatientAuthStack.default}
        options={{
          headerShown: false,
        }}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.DOCTOR}
        component={DoctorAuthStack.default}
        options={{
          headerShown: false,
        }}
      />
      <WelcomeStack.Screen
        name={PAGE_NAMES.PORTALS.PATIENT_RELATIVE}
        component={PatientRelativeAuthStack.default}
        options={{
          headerShown: false,
        }}
      />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackNavigator;
