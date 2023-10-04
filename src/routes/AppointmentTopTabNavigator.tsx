import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PastAppointments from '../screens/Appointments/PastAppointments/PastAppointments';
import NewAppointment from '../screens/Appointments/NewAppointment/NewAppointment';
import {PAGE_NAMES} from '../constants';

const TopTabs = createMaterialTopTabNavigator();

const AppointmentTopTabNavigator = () => {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen
        name={PAGE_NAMES.APPOINTMENTS.NEW_APPOINTMENT}
        component={NewAppointment}
        options={{title: 'Randevum', tabBarLabel: 'Randevum'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.APPOINTMENTS.PAST_APPOINTMENTS}
        component={PastAppointments}
        options={{title: 'Geçmiş Randevular', tabBarLabel: 'Geçmiş Randevular'}}
      />
    </TopTabs.Navigator>
  );
};

export default AppointmentTopTabNavigator;
