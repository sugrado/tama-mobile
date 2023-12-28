import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PAGE_NAMES} from '../../constants';
import Home from '../../screens/doctor/Home/Home';
import SearchPatient from '../../screens/doctor/Home/SearchPatient';
import Diagnoses from '../../screens/doctor/Home/Diagnoses';
import DailyQuestionAnswers from '../../screens/doctor/Home/DailyQuestionAnswers';
import ChronicDiseases from '../../screens/doctor/Home/ChronicDiseases';

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
        title: 'Genel Bilgiler',
      }}
    />
    <HomeStack.Screen
      name={PAGE_NAMES.DOCTOR.HOME.DIAGNOSES}
      component={Diagnoses}
      options={{headerShown: true, title: 'Teşhisler'}}
    />
    <HomeStack.Screen
      name={PAGE_NAMES.DOCTOR.HOME.DAILY_QUESTION_ANSWERS}
      component={DailyQuestionAnswers}
      options={{headerShown: true, title: 'Yanıtlanan Sorular'}}
    />
    <HomeStack.Screen
      name={PAGE_NAMES.DOCTOR.HOME.CHRONIC_DISEASES}
      component={ChronicDiseases}
      options={{
        headerShown: true,
        title: 'Kronik Hastalıklar',
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
