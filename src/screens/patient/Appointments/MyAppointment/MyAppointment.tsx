import React, {useCallback, useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import SugradoButton from '../../../../components/core/SugradoButton';
import {StyleSheet, View} from 'react-native';
import SugradoDialog from '../../../../components/core/SugradoDialog';
import NewAppointment from './NewAppointment';
import Loading from '../../../../components/layout/Loading';
import {
  cancelAppointment,
  getMyAppointment,
} from '../../../../api/appointments/appointment';
import {CustomError, isCritical} from '../../../../utils/customErrors';
import {GetMyAppointmentResponse} from '../../../../api/appointments/dtos/get-my-appointment-response';
import {FormatType, formatDate} from '../../../../utils/helpers';
import {useFocusEffect} from '@react-navigation/native';
import SugradoErrorPage from '../../../../components/core/SugradoErrorPage';
import SugradoErrorSnackbar from '../../../../components/core/SugradoErrorSnackbar';

export default function MyAppointment() {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointment, setAppointment] =
    useState<GetMyAppointmentResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [cancelDialogVisible, setCancelDialogVisible] =
    useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getAppointment();
    }, []),
  );

  const getAppointment = async () => {
    setLoading(true);
    const response = await getMyAppointment();
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setAppointment(response!.data);
    setError(null);
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    const res = await cancelAppointment();
    if (res?.error) {
      setError(res.error);
      setCancelDialogVisible(false);
      setLoading(false);
      return;
    }
    setAppointment(null);
    setError(null);
    setLoading(false);
    setCancelDialogVisible(false);
  };

  const showDialog = () => setCancelDialogVisible(true);

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getAppointment} />
      ) : (
        <>
          {appointment ? (
            <Card style={styles.card_green}>
              <Card.Content style={styles.card_content}>
                <Text variant="titleLarge" style={styles.card_title_text}>
                  Randevu Bilgileriniz
                </Text>
                <View style={styles.partOfAppointment}>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    Doktor:
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    {appointment.doctorFullName}
                  </Text>
                </View>
                <View style={styles.partOfAppointment}>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    Tarih:
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    {formatDate(appointment.takenDate, FormatType.DATE)}
                  </Text>
                </View>
                <View style={styles.partOfAppointment}>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    Saat:
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={styles.card_body_success_text}>
                    {formatDate(appointment.probableStartTime, FormatType.TIME)}{' '}
                    - {formatDate(appointment.probableEndTime, FormatType.TIME)}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <SugradoButton
                  title="İptal Et"
                  icon="trash-can-outline"
                  onPress={showDialog}
                  buttonColor={COLORS.DARK_RED}
                />
                <SugradoDialog
                  title="Randevu İptali"
                  body="Randevunuzu iptal etmek istediğinizden emin misiniz?"
                  visible={cancelDialogVisible}
                  action={handleCancel}
                  actionText="Evet"
                  cancelAction={() => setCancelDialogVisible(false)}
                  cancelText="Hayır"
                />
              </Card.Actions>
            </Card>
          ) : (
            <Card style={styles.card_red}>
              <Card.Content style={styles.card_content}>
                <Text variant="titleLarge" style={styles.card_title_text}>
                  Randevu Bulunamadı
                </Text>
                <Text variant="bodyMedium" style={styles.card_body_fail_text}>
                  Mevcut randevunuz bulunmamaktadır. Lütfen aşağıdaki butonu
                  kullanarak yeni randevu alınız.
                </Text>
                <NewAppointment
                  setError={setError}
                  onAppointmentCreated={a =>
                    setAppointment({
                      takenDate: a.takenDate,
                      doctorFullName: a.doctorFullName,
                      probableStartTime: a.probableStartTime,
                      probableEndTime: a.probableEndTime,
                    } as GetMyAppointmentResponse)
                  }
                />
              </Card.Content>
            </Card>
          )}
        </>
      )}
      {error && <SugradoErrorSnackbar error={error} duration={3000} />}
    </>
  );
}

const styles = StyleSheet.create({
  partOfAppointment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  form_field: {
    marginBottom: 10,
  },
  card_red: {
    margin: 10,
    backgroundColor: COLORS.CARD_UNSUCCESS_BACKGROUND,
  },
  card_green: {
    margin: 10,
    backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
  },
  card_content: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  card_body_success_text: {
    margin: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card_body_fail_text: {
    textAlign: 'center',
    marginVertical: 15,
  },
  card_title_text: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
