import React from 'react';
import Profile from '../screens/Profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyMedicines from '../screens/MyMedicines/MyMedicines';
import Appointments from '../screens/Appointments/Appointments';
import Home from '../screens/Home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PageNames} from './RouteNames';

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      initialRouteName={PageNames.home}
      screenOptions={({route}) => ({
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
        tabBarActiveTintColor: '#4D7E3E',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#F5F5F5',
          height: 70,
        },
      })}>
      <Tab.Screen
        name={PageNames.home}
        component={Home}
        options={{title: 'Ana Sayfa'}}
      />
      <Tab.Screen
        name={PageNames.myMedicines}
        component={MyMedicines}
        options={{title: 'İlaçlarım'}}
      />
      <Tab.Screen
        name={PageNames.appointments}
        component={Appointments}
        options={{title: 'Randevular'}}
      />
      <Tab.Screen
        name={PageNames.profile}
        component={Profile}
        options={{title: 'Profil'}}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return <TabGroup />;
}

const getIconNameByPage = (name: string, focused: boolean) => {
  switch (name) {
    case PageNames.home:
      return focused ? 'home' : 'home-outline';
    case PageNames.myMedicines:
      return focused ? 'medical' : 'medical-outline';
    case PageNames.appointments:
      return focused ? 'calendar' : 'calendar-outline';
    case PageNames.profile:
      return focused ? 'person' : 'person-outline';
    default:
      throw new Error('Invalid page name');
  }
};
