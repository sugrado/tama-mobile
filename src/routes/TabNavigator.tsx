import React from 'react';
import Profile from '../screens/Profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyMedicines from '../screens/MyMedicines/MyMedicines';
import Home from '../screens/Home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PAGE_NAMES} from '../constants';
import NewAppointment from '../screens/Appointments/NewAppointment/NewAppointment';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={PAGE_NAMES.home}
      screenOptions={({route}) => ({
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
        tabBarActiveTintColor: '#4D7E3E',
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
        name={PAGE_NAMES.home}
        component={Home}
        options={{title: 'Ana Sayfa', tabBarLabel: 'Ana Sayfa'}}
      />
      <Tab.Screen
        name={PAGE_NAMES.myMedicines}
        component={MyMedicines}
        options={{title: 'İlaçlarım', tabBarLabel: 'İlaçlarım'}}
      />
      <Tab.Screen
        name={PAGE_NAMES.appointments}
        component={NewAppointment} // TODO: Change this to AppointmentsStackGroup
        options={{title: 'Randevu', tabBarLabel: 'Randevu'}}
      />
      <Tab.Screen
        name={PAGE_NAMES.profile}
        component={Profile}
        options={{title: 'Profil', tabBarLabel: 'Profil'}}
      />
    </Tab.Navigator>
  );
}

const getIconNameByPage = (name: string, focused: boolean) => {
  switch (name) {
    case PAGE_NAMES.home:
      return focused ? 'home' : 'home-outline';
    case PAGE_NAMES.myMedicines:
      return focused ? 'medical' : 'medical-outline';
    case PAGE_NAMES.appointments:
      return focused ? 'calendar' : 'calendar-outline';
    case PAGE_NAMES.profile:
      return focused ? 'person' : 'person-outline';
    default:
      throw new Error('Invalid page name');
  }
};
