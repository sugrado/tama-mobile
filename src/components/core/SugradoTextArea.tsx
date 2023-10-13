import React from 'react';
import {KeyboardTypeOptions, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

type SugradoTextAreaProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  value: any;
  valueChange?: (input: string) => void;
  style?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
};

export default function SugradoTextArea({
  label,
  keyboardType = 'default',
  value,
  valueChange,
  style,
  secureTextEntry = false,
  disabled = false,
}: SugradoTextAreaProps) {
  return (
    <TextInput
      multiline={true}
      style={{width: '100%', backgroundColor: 'transparent', ...style}}
      contentStyle={{marginTop: 5}}
      label={<Text style={{fontWeight: 'bold'}}>{label}</Text>}
      mode="flat"
      value={value}
      onChangeText={valueChange}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      theme={{
        colors: {primary: 'green'},
      }}
      outlineColor="transparent"
      disabled={disabled}
    />
  );
}
