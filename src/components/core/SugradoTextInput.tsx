import React, {ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoTextProps = {
  keyboardType?: KeyboardTypeOptions | undefined;
  value: any;
  valueChange?: (input: string) => void;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  disabled?: boolean;
  right?: ReactNode;
  placeholder: string;
  onBlur?: () => void;
  label?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoComplete?: 'off' | 'username' | 'password' | 'email' | undefined;
  autoCorrect?: boolean;
};

export default function SugradoTextInput({
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
  autoCapitalize = undefined,
  autoComplete = undefined,
  autoCorrect = true,
}: SugradoTextProps) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        value={value}
        placeholder={placeholder}
        onChangeText={valueChange}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        theme={{
          colors: {primary: COLORS.PRIMARY_THEME},
        }}
        disabled={disabled}
        right={right}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
  },
  label: {
    marginLeft: 5,
    marginBottom: 3,
  },
});
