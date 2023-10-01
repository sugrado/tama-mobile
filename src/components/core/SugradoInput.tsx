import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {TextInput} from 'react-native-paper';

type SugradoInputProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: string;
  valueChange: (input: string) => void;
  style?: any;
  secureTextEntry?: boolean;
};

export default function SugradoInput({
  label,
  keyboardType = 'default',
  value,
  valueChange,
  style,
  secureTextEntry = false,
}: SugradoInputProps) {
  return (
    <TextInput
      style={{width: '100%', ...style}}
      label={label}
      mode="outlined"
      value={value}
      onChangeText={valueChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      theme={{
        colors: {primary: 'green'},
        roundness: 50,
      }}
      outlineColor="transparent"
    />
  );
}
