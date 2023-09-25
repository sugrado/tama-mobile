import React from 'react';
import Profile from '../screens/Profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyMedicines from '../screens/MyMedicines/MyMedicines';
import Home from '../screens/Home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PageNames} from '../constants/RouteNames';
import NewAppointment from '../screens/Appointments/NewAppointment/NewAppointment';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={PageNames.home}
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
        name={PageNames.home}
        component={Home}
        options={{title: 'Ana Sayfa', tabBarLabel: 'Ana Sayfa'}}
      />
      <Tab.Screen
        name={PageNames.myMedicines}
        component={MyMedicines}
        options={{title: 'İlaçlarım', tabBarLabel: 'İlaçlarım'}}
      />
      <Tab.Screen
        name={PageNames.appointments}
        component={NewAppointment} // TODO: Change this to AppointmentsStackGroup
        options={{title: 'Randevu', tabBarLabel: 'Randevu'}}
      />
      <Tab.Screen
        name={PageNames.profile}
        component={Profile}
        options={{title: 'Profil', tabBarLabel: 'Profil'}}
      />
    </Tab.Navigator>
  );
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
