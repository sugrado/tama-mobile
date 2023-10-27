import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS, PAGE_NAMES} from '../../constants';
import PastAppointments from '../../screens/patient/Appointments/PastAppointments/PastAppointments';
import MyAppointment from '../../screens/patient/Appointments/MyAppointment/MyAppointment';

const TopTabs = createMaterialTopTabNavigator();

const AppointmentTopTabNavigator = () => {
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
        name={PAGE_NAMES.PATIENT.APPOINTMENTS.NEW_APPOINTMENT}
        component={MyAppointment}
        options={{title: 'Randevum', tabBarLabel: 'Randevum'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.PATIENT.APPOINTMENTS.PAST_APPOINTMENTS}
        component={PastAppointments}
        options={{title: 'Geçmiş Randevular', tabBarLabel: 'Geçmiş Randevular'}}
      />
    </TopTabs.Navigator>
  );
};

export default AppointmentTopTabNavigator;
