import React, {useState} from 'react';
import ScanQRCodeButton from '../Home/components/ScanQRCodeButton';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoBarcodeScanner from '../../../components/core/SugradoBarcodeScanner';
import {
  checkCameraPermission,
  showPermissionRequiredAlert,
} from '../../../utils/permission';
import {CustomError} from '../../../utils/customErrors';
import {create} from '../../../api/patientRelatives/patientRelative';
import {PAGE_NAMES} from '../../../constants';
import Loading from '../../../components/layout/Loading';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';

const ScanQRCode = ({navigation}: any) => {
  const [scanner, setScanner] = useState<JSX.Element>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  if (scanner) {
    return scanner;
  }

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
    navigation.navigate(PAGE_NAMES.RELATIVE.HOME.HOME);
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
      <TopSmallIconLayout pageName="QR Kod Okut">
        <ScanQRCodeButton handleScanQRCode={handleScanQRCode} />
      </TopSmallIconLayout>
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

export default ScanQRCode;
