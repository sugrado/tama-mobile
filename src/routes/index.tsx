import React from 'react';
import TabNavigator from './TabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, Text} from 'react-native-paper';
import {StatusBar, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants';

export default function Navigation() {
  const {isLoading, userToken, userInfo} = useAuth();
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
      {userToken === null ? (
        <AuthStackNavigator />
      ) : (
        <TabNavigator consentAccepted={userInfo.consentAccepted} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_text: {marginTop: 10},
});
