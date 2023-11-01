import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import SugradoButton from '../../../../components/core/SugradoButton';
import {StyleSheet} from 'react-native';
import SugradoDialog from '../../../../components/core/SugradoDialog';
import NewAppointment from './NewAppointment';
import Loading from '../../../../components/layout/Loading';

export class MyAppointmentDto {
  hospital: string;
  department: string;
  date: string;
  time: string;
  doctor: string;
}

export default function MyAppointment(/*{navigation}: any*/) {
  const [loading, setLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<MyAppointmentDto | null>(null);
  const [cancelDialogVisible, setCancelDialogVisible] =
    useState<boolean>(false);

  useEffect(() => {
    //TODO: Get appointment from backend
    setLoading(true);
    setAppointment({
      date: '30 Ağustos 2023',
      time: '14:30',
      doctor: 'Dr. Anıl İBİŞ',
    } as MyAppointmentDto);
    // setAppointment(null);
    setLoading(false);
  }, []);

  // TODO: will be used for refreshing the page when tab is pressed
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', (e: any) => {
  //     console.log('e', e);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleCancel = () => {
    // TODO: backend call for cancel appointment
    setAppointment(null);
    setCancelDialogVisible(false);
  };

  const showDialog = () => setCancelDialogVisible(true);

  return (
    <View>
      {loading && <Loading loading={loading} />}
      {appointment ? (
        <Card style={styles.card_green}>
          <Card.Content style={styles.card_content}>
            <Text variant="titleLarge" style={styles.card_title_text}>
              Randevu Bilgileriniz
            </Text>
            <Text variant="bodyMedium" style={styles.card_body_success_text}>
              Doktor: {appointment.doctor}
              {'\n'}
              Tarih: {appointment.date}
              {'\n'}
              Saat: {appointment.time}
            </Text>
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
              Randevu Bilgileriniz
            </Text>
            <Text variant="bodyMedium" style={styles.card_body_fail_text}>
              Mevcut randevunuz bulunmamaktadır. Lütfen aşağıdaki butonu
              kullanarak yeni randevu alınız.
            </Text>
            <NewAppointment
              onAppointmentCreated={a =>
                setAppointment({
                  date: a.date,
                  doctor: a.doctorFullName,
                  time: a.time,
                } as MyAppointmentDto)
              }
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  card_body_success_text: {
    marginVertical: 15,
    textAlign: 'center',
  },
  card_body_fail_text: {
    textAlign: 'center',
    marginVertical: 15,
  },
  card_title_text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
