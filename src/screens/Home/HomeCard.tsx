import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS} from '../../constants';

type HomeCardProps = {
  icon: string;
  navigateUrl?: string;
  headerText: string;
  bodyText: string;
  footerText?: string;
  statusText?: string;
  statusColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
};
const HomeCard = ({
  icon,
  headerText,
  bodyText,
  footerText,
  statusText,
  statusColor,
  backgroundColor = COLORS.CARD_SUCCESS_BACKGROUND,
  onPress,
}: HomeCardProps) => {
  return (
    <Card style={{backgroundColor, ...styles.card}} onPress={onPress}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderElement}>
            <MaterialCommunityIcons
              style={styles.cardHeaderElementIcon}
              name={icon}
              size={20}
              color="gray"
            />
            <Text style={styles.cardHeaderElementText}>{headerText}</Text>
          </View>
          {statusText && statusColor && (
            <View style={styles.cardHeaderElement}>
              <Octicons
                name="dot-fill"
                style={styles.cardHeaderElementIcon}
                color={statusColor}
              />
              <Text style={styles.cardHeaderElementText}>{statusText}</Text>
            </View>
          )}
        </View>
        <Text variant="bodyLarge">{bodyText}</Text>
        {footerText && (
          <View style={styles.cardFooter}>
            <Text variant="bodyMedium" style={styles.cardFooterText}>
              {footerText}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderLeftColor: COLORS.THEME_COLOR,
    borderLeftWidth: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardHeaderElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderElementIcon: {
    marginRight: 5,
  },
  cardHeaderElementText: {
    color: 'gray',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardFooterText: {
    color: 'gray',
  },
});

export default HomeCard;
