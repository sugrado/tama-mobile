import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import Loading from '../../../components/layout/Loading';
import {qrSummary} from '../../../api/patients/patient';
import {GetSummaryResponse} from '../../../api/patients/dtos/get-summary-response';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';

const SearchPatient = ({route}: any) => {
  const {code} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<GetSummaryResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    getPatientInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatientInfo = async () => {
    setLoading(true);
    const res = await qrSummary(code);
    setError(res.error);
    setPatient(res.data);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getPatientInfo} />
      ) : (
        <View>
          <Text variant="bodyMedium">{code}</Text>
          {Object.keys(patient || {}).map(key => (
            <Text variant="bodyMedium" key={key}>
              {key}: {(patient as any)[key]}
            </Text>
          ))}
        </View>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

export default SearchPatient;
