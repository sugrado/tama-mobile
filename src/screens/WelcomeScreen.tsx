import {View} from 'react-native';
import React from 'react';
import SugradoButton from '../components/core/SugradoButton';
import {PAGE_NAMES} from '../constants';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <View>
      <SugradoButton
        title="Hasta"
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PORTALS.PATIENT);
        }}
      />
      <SugradoButton
        title="Hasta Yakını"
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PORTALS.PATIENT_RELATIVE);
        }}
      />
      <SugradoButton
        title="Doktor"
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PORTALS.DOCTOR);
        }}
      />
    </View>
  );
};

export default WelcomeScreen;
