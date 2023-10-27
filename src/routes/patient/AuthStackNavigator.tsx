import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import FirstAppointment from '../../screens/patient/Login/FirstAppointment';
import ForgotPassword from '../../screens/patient/Login/ForgotPassword';
import Login from '../../screens/patient/Login/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={PAGE_NAMES.AUTH.LOGIN}
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name={PAGE_NAMES.AUTH.LOGIN} component={Login} />
    <AuthStack.Screen
      name={PAGE_NAMES.AUTH.FIRST_APPOINTMENT}
      component={FirstAppointment}
      options={{
        headerShown: true,
      }}
    />
    <AuthStack.Screen
      name={PAGE_NAMES.AUTH.FORGOT_PASSWORD}
      component={ForgotPassword}
      options={{
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
      }}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
