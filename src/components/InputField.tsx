import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {TextInput} from 'react-native-paper';

type InputFieldProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string;
  valueChange: (input: string) => void;
  style?: any;
  secureTextEntry?: boolean;
};

export default function InputField({
  label,
  keyboardType = 'default',
  value,
  valueChange,
  style,
  secureTextEntry = false,
}: InputFieldProps) {
  return (
    <TextInput
      style={{width: '80%', ...style}}
      label={label}
      value={value}
      onChangeText={valueChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
}
