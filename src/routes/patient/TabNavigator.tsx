import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, PAGE_NAMES} from '../../constants';
import HomeStackNavigator from './HomeStackNavigator';
import AppointmentTopTabNavigator from './AppointmentTopTabNavigator';
import ConsentConfirmation from '../../components/modals/ConsentConfirmation';
import MyMedicinesTopTabNavigator from './MyMedicinesTopTabNavigator';
import Psychoeducation from '../../screens/patient/Psychoeducation/Psychoeducation';
import Profile from '../../screens/patient/Profile/Profile';

const Tab = createBottomTabNavigator();

type TabNavigatorProps = {
  consentAccepted: boolean;
};

export default function TabNavigator({consentAccepted}: TabNavigatorProps) {
  return (
    <>
      {consentAccepted ? (
        <Tab.Navigator
          initialRouteName={PAGE_NAMES.PATIENT.HOME.HOME_STACK}
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
            name={PAGE_NAMES.PATIENT.MY_MEDICINES.MY_MEDICINES_TOP_TAB}
            component={MyMedicinesTopTabNavigator}
            options={{title: 'İlaçlarım', tabBarLabel: 'İlaçlarım'}}
          />
          <Tab.Screen
            name={PAGE_NAMES.PATIENT.PSYCHOEDUCATION}
            component={Psychoeducation}
            options={{title: 'Psikoeğitim', tabBarLabel: 'Psikoeğitim'}}
          />
          <Tab.Screen
            name={PAGE_NAMES.PATIENT.HOME.HOME_STACK}
            component={HomeStackNavigator}
            options={{title: 'Ana Sayfa', tabBarLabel: 'Ana Sayfa'}}
          />
          <Tab.Screen
            name={PAGE_NAMES.PATIENT.APPOINTMENTS.APPOINTMENT_TOP_TAB}
            component={AppointmentTopTabNavigator}
            options={{title: 'Randevu', tabBarLabel: 'Randevu'}}
          />
          <Tab.Screen
            name={PAGE_NAMES.PATIENT.PROFILE}
            component={Profile}
            options={{title: 'Profil', tabBarLabel: 'Profil'}}
          />
        </Tab.Navigator>
      ) : (
        <ConsentConfirmation />
      )}
    </>
  );
}

const getIconNameByPage = (name: string, focused: boolean) => {
  switch (name) {
    case PAGE_NAMES.PATIENT.HOME.HOME_STACK:
      return focused ? 'home' : 'home-outline';
    case PAGE_NAMES.PATIENT.MY_MEDICINES.MY_MEDICINES_TOP_TAB:
      return focused ? 'medical' : 'medical-outline';
    case PAGE_NAMES.PATIENT.APPOINTMENTS.APPOINTMENT_TOP_TAB:
      return focused ? 'calendar' : 'calendar-outline';
    case PAGE_NAMES.PATIENT.PROFILE:
      return focused ? 'person' : 'person-outline';
    case PAGE_NAMES.PATIENT.PSYCHOEDUCATION:
      return focused ? 'book' : 'book-outline';
    default:
      throw new Error('Invalid page name');
  }
};
