import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {COLORS, PAGE_NAMES} from '../../constants';
import MyMedicines from '../../screens/patient/MyMedicines/MyMedicines';
import SideEffects from '../../screens/patient/MyMedicines/SideEffects';

const TopTabs = createMaterialTopTabNavigator();

const MyMedicinesTopTabNavigator = () => {
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
        name={PAGE_NAMES.MY_MEDICINES.MY_MEDICINES}
        component={MyMedicines}
        options={{title: 'İlaçlarım', tabBarLabel: 'İlaçlarım'}}
      />
      <TopTabs.Screen
        name={PAGE_NAMES.MY_MEDICINES.SIDE_EFFECTS}
        component={SideEffects}
        options={{title: 'Yan Etkiler', tabBarLabel: 'Yan Etkiler'}}
      />
    </TopTabs.Navigator>
  );
};

export default MyMedicinesTopTabNavigator;
