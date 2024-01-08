import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants';
import {GetDiagnosesByPatientListItemDto} from '../../../../api/diagnoses/dto/get-diagnoses-by-patient-list-item.dto';
import {FormatType, formatDate} from '../../../../utils/helpers';
import SugradoDividerText from '../../../../components/core/SugradoDividerText';

type PatientDiagnosisListItemProps = {
  diagnosis: GetDiagnosesByPatientListItemDto;
};

export const PatientDiagnosisListItem = ({
  diagnosis,
}: PatientDiagnosisListItemProps) => {
  return (
    <View style={styles.item_container}>
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
      <SugradoDividerText text="Tanımlanan İlaç(lar)" style={styles.divider} />
      {diagnosis.medicines.map(medicine => (
        <View style={styles.medicine_container} key={medicine.medicineName}>
          <Text variant="bodyMedium" style={styles.section_title}>
            İlaç Adı: <Text variant="bodyMedium">{medicine.medicineName}</Text>
          </Text>
          {medicine.times.map((time, index) => (
            <Text variant="bodyMedium" key={index} style={styles.section_field}>
              - {time.description}
            </Text>
          ))}
        </View>
      ))}
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
    marginStart: 10,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  section_field: {
    marginStart: 10,
  },
  medicine_container: {
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
});
