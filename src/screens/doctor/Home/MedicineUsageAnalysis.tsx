import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomError, isCritical} from '../../../utils/customErrors';
import {PatientUsageAnalysisMedicine} from '../../../api/diagnosisMedicineTimeUsages/dto/patient-usage-analysis';
import {patientUsageAnalysis} from '../../../api/diagnosisMedicineTimeUsages/diagnosisMedicineTimeUsage';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import Loading from '../../../components/layout/Loading';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';
import {MedicineAnalysisListItem} from './components/MedicineAnalysisListItem';

const MedicineUsageAnalysis = ({route}: any) => {
  const {patientId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [medicineAnalysis, setMedicineAnalysis] = useState<
    PatientUsageAnalysisMedicine[]
  >([]);

  useEffect(() => {
    getAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAnalysis = async () => {
    setLoading(true);
    const res = await patientUsageAnalysis(patientId);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setMedicineAnalysis(res.data!.medicines);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getAnalysis} />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={medicineAnalysis}
            renderItem={({item}) => (
              <MedicineAnalysisListItem medicineAnalysis={item} />
            )}
            keyExtractor={(item: PatientUsageAnalysisMedicine) => item.name}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getAnalysis} />
            }
            ListEmptyComponent={EmptyList}
          />
        </View>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const EmptyList = () => (
  <SugradoInfoCard
    text="Henüz hastaya tanımlı ilaç bulunamamıştır."
    icon="information-circle"
    style={styles.info_card}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_card: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default MedicineUsageAnalysis;
