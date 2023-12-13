import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {getQRCode} from '../../../api/patients/patient';
import Loading from '../../../components/layout/Loading';
import {COLORS} from '../../../constants';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';

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
                <Image
                  source={{uri: qrCode}}
                  style={styles.qr_code}
                  height={300}
                  width={300}
                />
                <Card style={styles.warning_container}>
                  <Card.Content>
                    <Text
                      variant="titleLarge"
                      style={styles.warning_title_text}>
                      Uyarı
                    </Text>
                    <Text variant="bodyMedium" style={styles.warning_body_text}>
                      Lütfen güvenliğiniz için QR kodunuzu doktorunuz ve
                      yakınınızdan başkasına göndermeyin ve göstermeyiniz.
                    </Text>
                  </Card.Content>
                </Card>
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
  warning_container: {
    backgroundColor: COLORS.WARNING,
    width: '90%',
  },
  warning_title_text: {textAlign: 'center'},
  warning_body_text: {textAlign: 'center', marginTop: 10},
  container: {
    flex: 1,
    alignItems: 'center',
  },
  qr_code: {
    alignSelf: 'center',
    marginVertical: 50,
  },
  show_qr_code_text: {
    textAlign: 'center',
    color: COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
  },
});

export default QRCode;
