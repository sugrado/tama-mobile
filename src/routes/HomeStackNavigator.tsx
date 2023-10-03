import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home/Home';
import DailyQuestions from '../screens/Home/DailyQuestions/DailyQuestions';
import DailyMedicines from '../screens/Home/DailyMedicines/DailyMedicines';
import {PAGE_NAMES} from '../constants';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    initialRouteName={PAGE_NAMES.HOME.HOME}
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Screen name={PAGE_NAMES.HOME.HOME} component={Home} />
    <HomeStack.Screen
      name={PAGE_NAMES.HOME.DAILY_QUESTIONS}
      component={DailyQuestions}
      options={{headerShown: true, title: 'Günlük Sorular'}}
    />
    <HomeStack.Screen
      name={PAGE_NAMES.HOME.DAILY_MEDICINES}
      component={DailyMedicines}
      options={{headerShown: true, title: 'Günlük İlaçlar'}}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
