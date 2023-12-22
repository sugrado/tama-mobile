import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoSwitchInputProps = {
  value: any;
  valueChange?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  label?: string;
};

export default function SugradoSwitchInput({
  value,
  label,
  valueChange,
  style,
  disabled = false,
}: SugradoSwitchInputProps) {
  return (
    <View style={[styles.container, style]}>
      <Text>{label}</Text>
      <Switch
        value={value === 'true'}
        onValueChange={valueChange}
        disabled={disabled}
        theme={{
          colors: {primary: COLORS.PRIMARY_THEME},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
