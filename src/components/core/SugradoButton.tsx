import React from 'react';
import {Button} from 'react-native-paper';
import {COLORS} from '../../constants';

type SugradoButtonProps = {
  onPress: () => void;
  title: string;
  icon?: string;
  style?: any;
  buttonColor?: string;
  disabled?: boolean;
};

export default function SugradoButton({
  onPress,
  title,
  icon,
  style,
  buttonColor = COLORS.BUTTON_COLOR,
  disabled = false,
}: SugradoButtonProps) {
  const styles = [
    style,
    {borderColor: disabled ? 'gray' : COLORS.BUTTON_COLOR},
  ];
  return (
    <Button
      mode="outlined"
      onPress={onPress}
      style={styles}
      buttonColor="white"
      textColor={COLORS.BUTTON_COLOR}
      theme={{dark: false}}
      icon={icon}
      disabled={disabled}>
      {title}
    </Button>
  );
}
