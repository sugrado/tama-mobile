import React from 'react';
import {Card, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
import {StyleSheet} from 'react-native';

type SugradoInfoCardProps = {
  text: string;
  icon: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  style?: any;
};

const SugradoInfoCard = ({
  text,
  icon,
  backgroundColor = COLORS.WARNING,
  textColor = 'black',
  iconColor = 'black',
  iconSize = 24,
  style,
}: SugradoInfoCardProps) => {
  return (
    <Card
      style={[
        styles.warning_container,
        {backgroundColor: backgroundColor},
        style,
      ]}>
      <Card.Content style={styles.warning_body}>
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.warning_body_icon}
        />
        <Text
          variant="bodyMedium"
          style={[styles.warning_body_text, {color: textColor}]}>
          {text}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  warning_container: {
    width: '90%',
  },
  warning_body: {
    display: 'flex',
    flexDirection: 'row',
  },
  warning_body_icon: {
    display: 'flex',
    flexBasis: '13%',
    flex: 1,
    alignSelf: 'center',
  },
  warning_body_text: {
    display: 'flex',
    flexBasis: '87%',
    flex: 1,
  },
});

export default SugradoInfoCard;
