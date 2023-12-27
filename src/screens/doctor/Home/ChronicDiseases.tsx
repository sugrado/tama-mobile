import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPatientChronicDiseases} from '../../../api/patientChronicDiseases/patientChronicDisease';
import {GetChronicDiseasesByPatientListItemDto} from '../../../api/patientChronicDiseases/dto/GetChronicDiseasesByPatientListItemDto';
import {CustomError, isCritical} from '../../../utils/customErrors';
import Loading from '../../../components/layout/Loading';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';
import {PatientChronicDiseaseListItem} from './components/PatientChronicDiseaseListItem';

const ChronicDiseases = ({route}: any) => {
  const {patientId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [chronicDiseases, setChronicDiseases] = useState<
    GetChronicDiseasesByPatientListItemDto[] | null
  >(null);

  useEffect(() => {
    getChronicDiseases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChronicDiseases = async () => {
    setLoading(true);
    const res = await getPatientChronicDiseases(patientId);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setChronicDiseases(res.data?.items!);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getChronicDiseases} />
      ) : (
        <View style={styles.container}>
          {chronicDiseases && chronicDiseases.length > 0 ? (
            chronicDiseases.map(chronicDisease => (
              <PatientChronicDiseaseListItem
                key={chronicDisease.id}
                chronicDisease={chronicDisease}
              />
            ))
          ) : (
            <SugradoInfoCard
              text="Hastanın kronik hastalığı bulunmamaktadır."
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

export default ChronicDiseases;
