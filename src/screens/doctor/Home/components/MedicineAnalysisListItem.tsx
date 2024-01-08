import {Text} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants';
import {PatientUsageAnalysisMedicine} from '../../../../api/diagnosisMedicineTimeUsages/dto/patient-usage-analysis';

type MedicineAnalysisListItemProps = {
  medicineAnalysis: PatientUsageAnalysisMedicine;
};

export const MedicineAnalysisListItem = ({
  medicineAnalysis,
}: MedicineAnalysisListItemProps) => {
  return (
    <View style={styles.item_container}>
      <Text variant="bodyMedium" style={styles.section_title}>
        İlaç Adı: <Text variant="bodyMedium">{medicineAnalysis.name}</Text>
      </Text>
      <View style={styles.period_container}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Son 1 Hafta
        </Text>
        <Text variant="bodyMedium">
          Kullanıldı: %{medicineAnalysis.weeklyPercentage.usedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Kullanılmadı: %{medicineAnalysis.weeklyPercentage.unusedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Cevap Verilmemiş: %{medicineAnalysis.weeklyPercentage.emptyPercentage}
        </Text>
      </View>
      <View style={styles.period_container}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Son 1 Ay
        </Text>
        <Text variant="bodyMedium">
          Kullanıldı: %{medicineAnalysis.monthlyPercentage.usedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Kullanılmadı: %{medicineAnalysis.monthlyPercentage.unusedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Cevap Verilmemiş: %
          {medicineAnalysis.monthlyPercentage.emptyPercentage}
        </Text>
      </View>
      <View style={styles.period_container}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Son 1 Yıl
        </Text>
        <Text variant="bodyMedium">
          Kullanıldı: %{medicineAnalysis.yearlyPercentage.usedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Kullanılmadı: %{medicineAnalysis.yearlyPercentage.unusedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Cevap Verilmemiş: %{medicineAnalysis.yearlyPercentage.emptyPercentage}
        </Text>
      </View>
      <View style={styles.period_container}>
        <Text variant="bodyMedium" style={styles.section_title}>
          Tüm Zamanlar
        </Text>
        <Text variant="bodyMedium">
          Kullanıldı: %{medicineAnalysis.allTimePercentage.usedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Kullanılmadı: %{medicineAnalysis.allTimePercentage.unusedPercentage}
        </Text>
        <Text variant="bodyMedium">
          Cevap Verilmemiş: %
          {medicineAnalysis.allTimePercentage.emptyPercentage}
        </Text>
      </View>
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
  period_container: {
    marginVertical: 10,
  },
});
