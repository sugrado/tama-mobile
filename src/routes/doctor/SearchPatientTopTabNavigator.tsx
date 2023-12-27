import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS, PAGE_NAMES} from '../../constants';
import General from '../../screens/doctor/Home/General';
import Diagnoses from '../../screens/doctor/Home/Diagnoses';
import DailyQuestionAnswers from '../../screens/doctor/Home/DailyQuestionAnswers';
import ChronicDiseases from '../../screens/doctor/Home/ChronicDiseases';

const TopTabs = createMaterialTopTabNavigator();

const SearchPatientTopTabNavigator = ({route}: any) => {
  return (
    <TopTabs.Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.THEME_COLOR,
          borderRadius: 50,
          height: 4,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          textTransform: 'capitalize',
        },
      }}>
      <TopTabs.Screen
        name={PAGE_NAMES.DOCTOR.SEARCH_PATIENT.GENERAL}
        component={General}
        initialParams={{code: route.params.code}}
        options={{title: 'Genel', tabBarLabel: 'Genel'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.DOCTOR.SEARCH_PATIENT.DIAGNOSES}
        component={Diagnoses}
        initialParams={{code: route.params.code}}
        options={{title: 'Teşhisler', tabBarLabel: 'Teşhisler'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.DOCTOR.SEARCH_PATIENT.DAILY_QUESTION_ANSWERS}
        component={DailyQuestionAnswers}
        initialParams={{code: route.params.code}}
        options={{title: 'Günlük Sorular', tabBarLabel: 'Günlük Sorular'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.DOCTOR.SEARCH_PATIENT.CHRONIC_DISEASES}
        initialParams={{code: route.params.code}}
        component={ChronicDiseases}
        options={{
          title: 'Kronik Hastalıklar',
          tabBarLabel: 'Kronik Hastalıklar',
        }}
      />
    </TopTabs.Navigator>
  );
};

export default SearchPatientTopTabNavigator;
