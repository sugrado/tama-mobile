import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Login from '../../screens/relative/Login/Login';
import Register from '../../screens/relative/Login/Register';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={PAGE_NAMES.RELATIVE.AUTH.LOGIN}
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
    <AuthStack.Screen name={PAGE_NAMES.RELATIVE.AUTH.LOGIN} component={Login} />
    <AuthStack.Screen
      name={PAGE_NAMES.RELATIVE.AUTH.REGISTER}
      component={Register}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
