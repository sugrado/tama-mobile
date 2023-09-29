import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useAuth} from '../../contexts/AuthContext';

export default function Profile() {
  const {logout} = useAuth();
  return (
    <View>
      <Button onPress={logout}>Çıkış Yap</Button>
    </View>
  );
}
