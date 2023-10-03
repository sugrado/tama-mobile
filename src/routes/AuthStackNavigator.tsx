import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login/Login';
import {PAGE_NAMES} from '../constants';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={PAGE_NAMES.AUTH.LOGIN}
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name={PAGE_NAMES.AUTH.LOGIN} component={Login} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
