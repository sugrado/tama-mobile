import React, {ReactNode} from 'react';
import {KeyboardTypeOptions, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoTextProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: any;
  valueChange?: (input: string) => void;
  style?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  right?: ReactNode;
  placeholder?: string;
};

export default function SugradoText({
  label,
  keyboardType = 'default',
  value,
  valueChange,
  style,
  secureTextEntry = false,
  disabled = false,
  right,
  placeholder,
}: SugradoTextProps) {
  return (
    <TextInput
      style={{width: '100%', backgroundColor: 'transparent', ...style}}
      label={<Text style={{fontWeight: 'bold'}}>{label}</Text>}
      mode="flat"
      value={value}
      placeholder={placeholder}
      onChangeText={valueChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      theme={{
        colors: {primary: COLORS.PRIMARY_THEME},
      }}
      outlineColor="transparent"
      disabled={disabled}
      right={right}
    />
  );
}
