import {View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

const Home = () => {
  return (
    <View>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: COLORS.BUTTON_COLOR,
          height: 100,
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 20,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text variant="displaySmall" style={{color: COLORS.TEXT}}>
            QR Okut
          </Text>
          <Text variant="bodyMedium" style={{color: COLORS.TEXT}}>
            Hasta bilgilerini görüntülemek için QR kodunu okutun
          </Text>
        </View>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={90}
          color={COLORS.TEXT}
        />
      </View>
    </View>
  );
};

export default Home;
