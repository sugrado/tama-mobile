import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, PAGE_NAMES} from '../../constants';
import Home from '../../screens/relative/Home/Home';
import SettingsStackNavigator from './SettingsStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={PAGE_NAMES.RELATIVE.HOME}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
        headerShown: false,
        tabBarIcon: ({color, focused, size}) => {
          return (
            <Ionicons
              name={getIconNameByPage(route.name, focused)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: COLORS.NAVIGATION_ACTIVE_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
        },
        tabBarItemStyle: {
          paddingBottom: 10,
          paddingTop: 3,
        },
      })}>
      <Tab.Screen
        name={PAGE_NAMES.RELATIVE.HOME}
        component={Home}
        options={{title: 'Ana Sayfa', tabBarLabel: 'Ana Sayfa'}}
      />
      <Tab.Screen
        name={PAGE_NAMES.RELATIVE.SETTINGS.SETTINGS_STACK}
        component={SettingsStackNavigator}
        options={{title: 'Ayarlar', tabBarLabel: 'Ayarlar'}}
      />
    </Tab.Navigator>
  );
}

const getIconNameByPage = (name: string, focused: boolean) => {
  switch (name) {
    case PAGE_NAMES.RELATIVE.HOME:
      return focused ? 'home' : 'home-outline';
    case PAGE_NAMES.PATIENT.SETTINGS.SETTINGS_STACK:
      return focused ? 'settings' : 'settings-outline';
    default:
      throw new Error('Invalid page name');
  }
};
