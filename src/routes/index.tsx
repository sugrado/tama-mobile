import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, Text} from 'react-native-paper';
import {StatusBar, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import {LoggedPatientDto, LoggedUserType, UserRoles} from '../dtos/auth.dto';
import * as PatientTabNav from './patient/TabNavigator';
import * as DoctorTabNav from './doctor/TabNavigator';
import * as PatientRelativeTabNav from './patient-relative/TabNavigator';

export default function Navigation() {
  const {isLoading, isLoggedIn, userInfo} = useAuth();
  if (isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator
          animating={true}
          color={COLORS.THEME_COLOR}
          size="large"
        />
        <Text style={styles.loading_text}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.THEME_COLOR} />
      {isLoggedIn() ? getPortal(userInfo!) : <WelcomeStackNavigator />}
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

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_text: {marginTop: 10},
});
