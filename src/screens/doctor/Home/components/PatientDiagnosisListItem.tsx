import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants';
import {GetDiagnosesByPatientListItemDto} from '../../../../api/diagnoses/dto/GetDiagnosesByPatientListItemDto';
import {FormatType, formatDate} from '../../../../utils/helpers';

type PatientDiagnosisListItemProps = {
  diagnosis: GetDiagnosesByPatientListItemDto;
};

export const PatientDiagnosisListItem = ({
  diagnosis,
}: PatientDiagnosisListItemProps) => {
  return (
    <View style={styles.item_container}>
      <View style={styles.info_column}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Teşhis:{' '}
          <Text variant="bodyMedium">{diagnosis.detectedDisease.name}</Text>
        </Text>
        <Text variant="bodyMedium" style={styles.section_title}>
          Tarih:{' '}
          <Text variant="bodyMedium">
            {formatDate(diagnosis.startDate, FormatType.DATE)}
          </Text>
        </Text>
        <Text variant="bodyMedium" style={styles.section_title}>
          Açıklama:{' '}
          <Text variant="bodyMedium">{diagnosis.description ?? '-'}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item_container: {
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
    borderColor: COLORS.THEME_COLOR,
  },
  info_column: {
    marginEnd: 10,
    fontSize: 20,
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '90%',
  },
  section_title: {
    marginStart: 10,
    marginVertical: 5,
    fontWeight: 'bold',
  },
});
