import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, IconButton, Text} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS} from '../../../../constants';

type DailyQuestionCardProps = {
  statusColor: string;
  statusText: string;
  onPress: () => void;
  bodyText: string;
  backgroundColor: string;
  answer: string | undefined;
};

const DailyQuestionCard = ({
  statusColor,
  statusText,
  onPress,
  bodyText,
  backgroundColor,
  answer,
}: DailyQuestionCardProps) => {
  return (
    <Card
      style={{
        backgroundColor: backgroundColor,
        ...styles.card,
      }}
      onPress={answer ? () => {} : onPress}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderElement}>
            <Octicons
              name="dot-fill"
              style={styles.cardHeaderElementIcon}
              color={statusColor}
            />
            <Text style={{color: statusColor}}>{statusText}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.text_column}>
            <Text variant="bodyLarge">{bodyText}</Text>
            {!!answer && (
              <Text variant="bodyMedium" style={styles.answer_text}>
                Verilen Cevap: {answer}
              </Text>
            )}
          </View>
          {!answer && (
            <IconButton
              style={styles.button_column}
              icon="file-document-edit-outline"
              iconColor={COLORS.BUTTON_COLOR}
              size={24}
              onPress={onPress}
            />
          )}
        </View>
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
  },
  cardHeaderElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderElementIcon: {
    marginRight: 5,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  text_column: {
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '80%',
    flex: 1,
  },
  button_column: {
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '20%',
    flex: 1,
  },
  answer_text: {
    color: 'gray',
  },
});

export default DailyQuestionCard;
