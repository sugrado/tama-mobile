import React from 'react';
import TabNavigator from './TabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {ActivityIndicator, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export default function Navigation() {
  const {isLoading, userToken} = useAuth();
  if (isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator animating={true} color="#4D7E3E" size="large" />
        <Text style={styles.loading_text}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken === null ? <AuthStackNavigator /> : <TabNavigator />}
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
