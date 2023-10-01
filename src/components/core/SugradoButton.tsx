import React from 'react';
import {Button} from 'react-native-paper';

type SugradoButtonProps = {
  onPress: () => void;
  title: string;
  icon?: string;
  style?: any;
};

export default function SugradoButton({
  onPress,
  title,
  icon,
  style,
}: SugradoButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={style}
      theme={{dark: false}}
      buttonColor="#4D7E3E"
      icon={icon}>
      {title}
    </Button>
  );
}
