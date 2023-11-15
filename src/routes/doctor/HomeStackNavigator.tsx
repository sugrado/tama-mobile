import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Home from '../../screens/doctor/Home/Home';
import SearchPatient from '../../screens/doctor/Home/SearchPatient';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    initialRouteName={PAGE_NAMES.DOCTOR.HOME.HOME}
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name={PAGE_NAMES.DOCTOR.HOME.HOME} component={Home} />
    <HomeStack.Screen
      name={PAGE_NAMES.DOCTOR.HOME.SEARCH_PATIENT}
      component={SearchPatient}
      options={{
        headerShown: true,
        title: 'Hasta Sorgula',
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
