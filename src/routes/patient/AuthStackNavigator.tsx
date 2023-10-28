import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import FirstAppointment from '../../screens/patient/Login/FirstAppointment';
import ForgotPassword from '../../screens/patient/Login/ForgotPassword';
import Login from '../../screens/patient/Login/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={PAGE_NAMES.PATIENT.AUTH.LOGIN}
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
    <AuthStack.Screen name={PAGE_NAMES.PATIENT.AUTH.LOGIN} component={Login} />
    <AuthStack.Screen
      name={PAGE_NAMES.PATIENT.AUTH.FIRST_APPOINTMENT}
      component={FirstAppointment}
    />
    <AuthStack.Screen
      name={PAGE_NAMES.PATIENT.AUTH.FORGOT_PASSWORD}
      component={ForgotPassword}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
