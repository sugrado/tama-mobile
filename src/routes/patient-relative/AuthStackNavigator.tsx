import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Login from '../../screens/patient-relative/Login/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={PAGE_NAMES.PATIENT_RELATIVE.AUTH.LOGIN}
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
    <AuthStack.Screen
      name={PAGE_NAMES.PATIENT_RELATIVE.AUTH.LOGIN}
      component={Login}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
