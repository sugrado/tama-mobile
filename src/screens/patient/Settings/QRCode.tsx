import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getQRCode} from '../../../api/patients/patient';
import Loading from '../../../components/layout/Loading';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';

const QRCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>();
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    loadQRCode();
  }, []);

  const loadQRCode = async () => {
    setLoading(true);
    const myQR = await getQRCode();
    if (myQR.error) {
      setError(myQR.error);
      setLoading(false);
      return;
    }
    setError(null);
    const base64Image = 'data:image/png;base64,' + myQR.data!.qrCode;
    setQrCode(base64Image);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={loadQRCode} />
      ) : (
        <>
          {qrCode && (
            <TopSmallIconLayout
              pageName="Ayarlar | QR Kodum"
              refreshMethod={loadQRCode}>
              <View style={styles.container}>
                <SugradoInfoCard
                  text="Lütfen güvenliğiniz için QR kodunuzu doktorunuz ve
                  yakınınızdan başkasına göndermeyin ve göstermeyiniz."
                  icon="warning"
                  iconSize={25}
                  style={styles.info_card}
                />
                <Image
                  source={{uri: qrCode}}
                  style={styles.qr_code}
                  height={300}
                  width={300}
                />
              </View>
            </TopSmallIconLayout>
          )}
        </>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  qr_code: {
    alignSelf: 'center',
    marginTop: 20,
  },
  info_card: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default QRCode;
