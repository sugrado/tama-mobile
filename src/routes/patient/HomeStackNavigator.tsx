import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import DailyQuestions from '../../screens/patient/Home/DailyQuestions/DailyQuestions';
import DailyMedicines from '../../screens/patient/Home/DailyMedicines/DailyMedicines';
import Home from '../../screens/patient/Home/Home';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    initialRouteName={PAGE_NAMES.PATIENT.HOME.HOME}
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name={PAGE_NAMES.PATIENT.HOME.HOME} component={Home} />
    <HomeStack.Screen
      name={PAGE_NAMES.PATIENT.HOME.DAILY_QUESTIONS}
      component={DailyQuestions}
      options={{
        headerShown: true,
        title: 'Günlük Sorular',
      }}
    />
    <HomeStack.Screen
      name={PAGE_NAMES.PATIENT.HOME.DAILY_MEDICINES}
      component={DailyMedicines}
      options={{headerShown: true, title: 'Günlük İlaçlar'}}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
