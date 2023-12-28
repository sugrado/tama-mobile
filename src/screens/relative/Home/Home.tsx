import React, {Fragment, useEffect, useState} from 'react';
import {
  checkCameraPermission,
  showPermissionRequiredAlert,
} from '../../../utils/permission';
import SugradoBarcodeScanner from '../../../components/core/SugradoBarcodeScanner';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import Loading from '../../../components/layout/Loading';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {getByRelative} from '../../../api/patients/patient';
import {GetByRelativeListItemDto} from '../../../api/patients/dtos/get-by-relative-list-item.dto';
import PatientDetailCard from './components/PatientDetailCard';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import {create} from '../../../api/patientRelatives/patientRelative';
import ScanQRCodeButton from './components/ScanQRCodeButton';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';
import {StyleSheet, View} from 'react-native';

const Home = () => {
  const [scanner, setScanner] = useState<JSX.Element>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [myPatients, setMyPatients] = useState<
    GetByRelativeListItemDto[] | null
  >(null);

  useEffect(() => {
    getMyPatients();
  }, []);

  if (scanner) {
    return scanner;
  }

  const getMyPatients = async () => {
    setLoading(true);
    const response = await getByRelative();
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    setMyPatients(response.data!.items);
    setLoading(false);
  };

  const onBack = () => {
    setScanner(undefined);
  };

  const onScanned = async (code: string) => {
    onBack();
    setLoading(true);
    const response = await create({patientQRCode: code});
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    await getMyPatients();
    setLoading(false);
  };

  const handleScanQRCode = async () => {
    const permissionGranted = await checkCameraPermission();
    if (!permissionGranted) {
      showPermissionRequiredAlert();
    } else {
      setScanner(
        <SugradoBarcodeScanner onBack={onBack} onScanned={onScanned} />,
      );
    }
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMyPatients} />
      ) : (
        <TopSmallIconLayout refreshMethod={getMyPatients} pageName="Ana Sayfa">
          <View style={styles.container}>
            {myPatients &&
              (myPatients.length > 0 ? (
                <Fragment>
                  <SugradoInfoCard
                    text="Yakınlarınız ile ilgili bildirimler alacaksınız."
                    icon="notifications-circle-sharp"
                    style={styles.infoCard}
                  />
                  {myPatients.map(item => (
                    <PatientDetailCard key={item.id} patient={item} />
                  ))}
                </Fragment>
              ) : (
                <ScanQRCodeButton handleScanQRCode={handleScanQRCode} />
              ))}
          </View>
        </TopSmallIconLayout>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  infoCard: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Home;
