import React, {ReactNode} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoTextAreaProps = {
  keyboardType?: KeyboardTypeOptions | undefined;
  value: any;
  valueChange?: (input: string) => void;
  style?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  right?: ReactNode;
  onBlur?: () => void;
};

export default function SugradoTextArea({
  keyboardType = 'default',
  value,
  label,
  valueChange,
  style,
  secureTextEntry = false,
  disabled = false,
  right,
  placeholder,
  onBlur,
}: SugradoTextAreaProps) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        mode="outlined"
        value={value}
        placeholder={placeholder}
        onChangeText={valueChange}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        theme={{
          colors: {primary: COLORS.PRIMARY_THEME},
        }}
        disabled={disabled}
        right={right}
        contentStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  label: {
    marginLeft: 5,
    marginBottom: 3,
  },
  content: {
    marginVertical: 10,
  },
});
