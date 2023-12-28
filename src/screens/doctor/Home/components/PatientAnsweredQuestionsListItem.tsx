import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants';
import {GetByPatientListItemDto} from '../../../../api/dailyQuestionAnswers/dto/get-by-patient-list-item.dto';
import {FormatType, formatDate} from '../../../../utils/helpers';

type PatientAnsweredQuestionListItemProps = {
  answeredQuestion: GetByPatientListItemDto;
};

export const PatientAnsweredQuestionListItem = ({
  answeredQuestion,
}: PatientAnsweredQuestionListItemProps) => {
  return (
    <View style={styles.item_container}>
      <Text variant="bodyMedium" style={styles.section_title}>
        Tarih:{' '}
        <Text variant="bodyMedium">
          {formatDate(answeredQuestion.date, FormatType.DATE)}
        </Text>
      </Text>
      {answeredQuestion.questions.map((question, index) => {
        const notAnsweredText = 'Yanıtlanmadı';
        const getAnswer = () => {
          if (!question.answer) {
            return null;
          }
          if (question.answer.answer) {
            return question.answer.answer;
          }
          if (question.answer.selectedOption) {
            return question.answer.selectedOption.value;
          }
          return null;
        };
        const answer = getAnswer();
        return (
          <View key={index} style={styles.dailyQuestionContainer}>
            <Text variant="bodyMedium">{question.description}</Text>
            <Text variant="bodyMedium">
              Yanıt:{' '}
              <Text
                style={[
                  styles.fieldValueText,
                  {color: answer ? undefined : COLORS.DARK_RED},
                ]}>
                {answer ?? notAnsweredText}
              </Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  item_container: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
    borderColor: COLORS.THEME_COLOR,
  },
  section_title: {
    marginVertical: 5,
    fontWeight: 'bold',
  },
  dailyQuestionContainer: {
    marginBottom: 10,
  },
  fieldValueText: {
    fontWeight: 'bold',
  },
});
