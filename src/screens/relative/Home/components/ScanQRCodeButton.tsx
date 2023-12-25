import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../constants';

const ScanQRCode = ({handleScanQRCode}: any) => {
  return (
    <TouchableOpacity
      style={styles.box}
      activeOpacity={0.5}
      onPress={handleScanQRCode}>
      <View style={styles.left_content}>
        <Text variant="headlineSmall" style={styles.title}>
          QR Kod Tara
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Yakını olduğunuz kişinin QR kodunu okutarak bildirimlerden anında
          haberdar olun.
        </Text>
      </View>
      <View style={styles.right_content}>
        <MaterialCommunityIcons name="qrcode-scan" size={80} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: COLORS.THEME_COLOR,
    padding: 30,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  left_content: {
    flex: 1,
    paddingRight: 20,
  },
  right_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: COLORS.TEXT,
  },
});

export default ScanQRCode;
