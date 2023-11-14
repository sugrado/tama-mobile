import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import {LoggedPatientDto, LoggedUserType, UserRoles} from '../dtos/auth.dto';
import * as PatientTabNav from './patient/TabNavigator';
import * as DoctorTabNav from './doctor/TabNavigator';
import * as PatientRelativeTabNav from './patient-relative/TabNavigator';
import Loading from '../components/layout/Loading';

export default function Navigation() {
  const {userInfo, isCheckProgress} = useAuth();

  if (isCheckProgress) {
    return <Loading loading={isCheckProgress} />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.THEME_COLOR} />
      {userInfo != null ? getPortal(userInfo) : <WelcomeStackNavigator />}
    </NavigationContainer>
  );
}

const getPortal = (userInfo: LoggedUserType) => {
  switch (userInfo.role) {
    case UserRoles.Patient:
      return (
        <PatientTabNav.default
          consentAccepted={(userInfo as LoggedPatientDto).consentAccepted}
        />
      );
    case UserRoles.Doctor:
      return <DoctorTabNav.default />;
    case UserRoles.PatientRelative:
      return <PatientRelativeTabNav.default />;
    default:
      return <WelcomeStackNavigator />;
  }
};
