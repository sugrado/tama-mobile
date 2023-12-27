import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomError, isCritical} from '../../../utils/customErrors';
import Loading from '../../../components/layout/Loading';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {PatientDiagnosisListItem} from './components/PatientDiagnosisListItem';
import {GetDiagnosesByPatientListItemDto} from '../../../api/diagnoses/dto/GetDiagnosesByPatientListItemDto';
import {getPatientDiagnoses} from '../../../api/diagnoses/diagnosis';

const Diagnoses = ({route}: any) => {
  const {patientId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [diagnoses, setDiagnoses] = useState<
    GetDiagnosesByPatientListItemDto[] | null
  >(null);

  useEffect(() => {
    getDiagnoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiagnoses = async () => {
    setLoading(true);
    const res = await getPatientDiagnoses(patientId);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setDiagnoses(res.data?.items!);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getDiagnoses} />
      ) : (
        <View style={styles.container}>
          {diagnoses && diagnoses.length > 0 ? (
            diagnoses.map(diagnosis => (
              <PatientDiagnosisListItem
                key={diagnosis.id}
                diagnosis={diagnosis}
              />
            ))
          ) : (
            <SugradoInfoCard
              text="Hastaya tanı konulmamıştır."
              icon="information-circle"
              style={styles.info_card}
            />
          )}
        </View>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info_card: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default Diagnoses;
