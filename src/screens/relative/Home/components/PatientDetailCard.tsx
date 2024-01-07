import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {GetByRelativeListItemDto} from '../../../../api/patients/dtos/get-by-relative-list-item.dto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormatType, formatDate} from '../../../../utils/helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type PatientDetailCardProps = {
  patient: GetByRelativeListItemDto;
};

const PatientDetailCard = ({patient}: PatientDetailCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderElement}>
            <MaterialCommunityIcons
              style={styles.cardHeaderElementIcon}
              name="account"
              size={24}
              color={COLORS.BUTTON_COLOR}
            />
            <Text variant="titleMedium" style={styles.cardHeaderElementText}>
              {patient.fullName}
            </Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.section}>
            <Title title="Günlük Sorular" icon="notebook-check-outline" />
            {patient.details.dailyQuestions.map(dailyQuestion => {
              const notAnsweredText = 'Yanıtlanmadı';
              const getAnswer = () => {
                if (!dailyQuestion.answer) {
                  return null;
                }
                if (dailyQuestion.answer.answer) {
                  return dailyQuestion.answer.answer;
                }
                if (dailyQuestion.answer.selectedOption) {
                  return dailyQuestion.answer.selectedOption.value;
                }
                return null;
              };
              const answer = getAnswer();
              return (
                <View
                  key={dailyQuestion.id}
                  style={styles.dailyQuestionContainer}>
                  <Text variant="bodyMedium">{dailyQuestion.description}</Text>
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
          <View style={styles.section}>
            <Title title="Günlük İlaçlar" icon="medical-bag" />
            {patient.details.dailyMedicines.map(dailyMedicine => {
              return (
                <View
                  key={dailyMedicine.medicineId}
                  style={styles.dailyQuestionContainer}>
                  <Text variant="bodyMedium">
                    İlaç Adı: {dailyMedicine.name}
                  </Text>
                  {dailyMedicine.times?.map((time, index) => (
                    <View key={time.time} style={styles.time_container}>
                      <Text key={index} style={styles.time_text}>
                        {formatDate(time.time, FormatType.TIME)}
                      </Text>
                      <FontAwesome5
                        name={getIconName(time.used)}
                        color={getColor(time.used)}
                        size={14}
                      />
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
          <View style={styles.section}>
            <Title title="Randevu Durumu" icon="calendar-month-outline" />
            {patient.details.appointment ? (
              <>
                <Text variant="bodyMedium">
                  Tarih:{' '}
                  <Text variant="bodyMedium" style={styles.fieldValueText}>
                    {formatDate(
                      patient.details.appointment.takenDate,
                      FormatType.DATE,
                    )}
                  </Text>
                </Text>
                <Text variant="bodyMedium">
                  Saat:{' '}
                  <Text variant="bodyMedium" style={styles.fieldValueText}>
                    {formatDate(
                      patient.details.appointment.probableStartTime,
                      FormatType.TIME,
                    ) +
                      ' - ' +
                      formatDate(
                        patient.details.appointment.probableEndTime,
                        FormatType.TIME,
                      )}
                  </Text>
                </Text>
                <Text variant="bodyMedium">
                  Doktor:{' '}
                  <Text variant="bodyMedium" style={styles.fieldValueText}>
                    {patient.details.appointment.doctorFullName}
                  </Text>
                </Text>
              </>
            ) : (
              <Text>Randevu alınmadı</Text>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const getIconName = (used: boolean | null) => {
  if (used == null) {
    return 'question-circle';
  }
  return used ? 'check-circle' : 'times-circle';
};

const getColor = (used: boolean | null) => {
  if (used == null) {
    return COLORS.QUESTION;
  }
  return used ? COLORS.THEME_COLOR : COLORS.DARK_RED;
};

const Title = ({title, icon}: {title: string; icon: string}) => {
  return (
    <View style={styles.sectionTitleContainer}>
      <MaterialCommunityIcons
        style={styles.sectionTitleIcon}
        name={icon}
        size={20}
        color={COLORS.BUTTON_COLOR}
      />
      <Text variant="titleMedium" style={styles.sectionTitleText}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderLeftColor: COLORS.THEME_COLOR,
    borderLeftWidth: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitleIcon: {
    marginRight: 5,
  },
  sectionTitleText: {
    color: COLORS.BUTTON_COLOR,
  },
  cardBody: {},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardFooterText: {
    color: 'gray',
  },
  section: {
    marginVertical: 10,
  },
  dailyQuestionContainer: {
    marginBottom: 10,
  },
  fieldValueText: {
    fontWeight: 'bold',
  },
  time_text: {
    color: 'gray',
    marginEnd: 5,
  },
  time_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PatientDetailCard;
