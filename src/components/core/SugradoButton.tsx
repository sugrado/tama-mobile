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
  buttonColor = COLORS.THEME_COLOR,
  disabled = false,
}: SugradoButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={style}
      theme={{dark: false}}
      buttonColor={buttonColor}
      icon={icon}
      disabled={disabled}>
      {title}
    </Button>
  );
}
