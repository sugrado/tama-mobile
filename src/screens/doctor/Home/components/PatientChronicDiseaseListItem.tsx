import {Text} from 'react-native-paper';
import {GetChronicDiseasesByPatientListItemDto} from '../../../../api/patientChronicDiseases/dto/GetChronicDiseasesByPatientListItemDto';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants';

type PatientChronicDiseaseListItemProps = {
  chronicDisease: GetChronicDiseasesByPatientListItemDto;
};

export const PatientChronicDiseaseListItem = ({
  chronicDisease,
}: PatientChronicDiseaseListItemProps) => {
  return (
    <View
      style={{
        ...styles.item_container,
        backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
        borderColor: COLORS.THEME_COLOR,
      }}>
      <View style={styles.info_column}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Hastalık:{' '}
          <Text variant="bodyMedium">{chronicDisease.chronicDisease.name}</Text>
        </Text>
        <Text variant="bodyMedium" style={styles.section_title}>
          Açıklama:{' '}
          <Text variant="bodyMedium">{chronicDisease.detail ?? '-'}</Text>
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
