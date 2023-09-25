import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/Login/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
