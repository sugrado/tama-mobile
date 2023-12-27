import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {COLORS} from '../../../../constants';

type PatientInfoRowProps = {
  label: string;
  value: string | number;
};

export const PatientInfoRow = ({label, value}: PatientInfoRowProps) => (
  <View
    style={{
      ...styles.item_container,
      backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
      borderColor: COLORS.THEME_COLOR,
    }}>
    <Text variant="bodyMedium" style={styles.selector_column}>
      {label}:
    </Text>
    <View style={styles.info_column}>
      <Text variant="bodyMedium">{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item_container: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    display: 'flex',
  },
  selector_column: {
    marginEnd: 10,
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '40%',
    flex: 1,
    fontWeight: 'bold',
  },
  info_column: {
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '60%',
    flex: 1,
  },
});
