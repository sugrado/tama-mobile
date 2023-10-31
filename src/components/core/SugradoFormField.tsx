import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from 'react-hook-form';
import {COLORS} from '../../constants';

type SugradoFormFieldProps = {
  control: any;
  rules: any;
  render: ControllerProps<FieldValues>['render'];
  name: string;
  error: any;
  style?: any;
};

const SugradoFormField = ({
  control,
  rules,
  render,
  name,
  error,
  style,
}: SugradoFormFieldProps) => {
  return (
    <View style={style}>
      <Controller control={control} rules={rules} render={render} name={name} />
      <SugradoErrorText error={error} />
    </View>
  );
};

type SugradoErrorTextProps = {
  error: FieldError | undefined;
};

const SugradoErrorText = ({error}: SugradoErrorTextProps) => {
  if (!error) {
    return null;
  }
  return <Text style={styles.error_text}>{error.message}</Text>;
};

const styles = StyleSheet.create({
  error_text: {
    color: COLORS.DARK_RED,
  },
});

export default SugradoFormField;
