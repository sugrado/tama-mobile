import React from 'react';
import TabNavigator from './TabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

export default function Navigation() {
  const user = null;
  return !user ? <AuthStackNavigator /> : <TabNavigator />;
}
