import React, {useCallback, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import Loading from '../../../../components/layout/Loading';
import {RefreshControl} from 'react-native';
import {getMyPast} from '../../../../api/appointments/appointment';
import {
  AppointmentStatus,
  AppointmentStatusDataSource,
  MyPastListItemDto,
} from '../../../../api/appointments/dtos/my-past-list-item.dto';
import {CustomError, isCritical} from '../../../../utils/customErrors';
import SugradoErrorSnackbar from '../../../../components/core/SugradoErrorSnackbar';
import SugradoErrorPage from '../../../../components/core/SugradoErrorPage';
import {FormatType, formatDate} from '../../../../utils/helpers';
import {useFocusEffect} from '@react-navigation/native';

type ItemProps = {item: MyPastListItemDto};

const Item = ({item}: ItemProps) => {
  const unsuccess: boolean =
    item.statusId === AppointmentStatus[AppointmentStatus.Cancelled];
  return (
    <View
      style={{
        ...styles.item_container,
        backgroundColor: unsuccess
          ? COLORS.CARD_UNSUCCESS_BACKGROUND
          : COLORS.CARD_SUCCESS_BACKGROUND,
        borderColor: unsuccess ? COLORS.DARK_RED : COLORS.THEME_COLOR,
      }}>
      <Text style={styles.selector_column}>#{item.id}</Text>
      <View style={styles.info_column}>
        <Text>Doktor: {item.doctorFullName}</Text>
        <Text>Tarih: {formatDate(item.takenDate, FormatType.DATE)}</Text>
        <Text>
          Saat: {formatDate(item.probableStartTime, FormatType.TIME)} -{' '}
          {formatDate(item.probableEndTime, FormatType.TIME)}
        </Text>
        <Text>
          Durum:{' '}
          {AppointmentStatusDataSource.find(s => s.id === item.statusId)?.name}
        </Text>
      </View>
    </View>
  );
};

export default function PastAppointments() {
  const [appointments, setAppointments] = useState<MyPastListItemDto[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useFocusEffect(
    useCallback(() => {
      getMyPastAppointments();
    }, []),
  );

  const getMyPastAppointments = async () => {
    setLoading(true);
    const res = await getMyPast(0, 10);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setAppointments(res.data?.items);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMyPastAppointments} />
      ) : (
        <>
          {appointments && appointments.length > 0 ? (
            <FlatList
              data={appointments}
              renderItem={({item}) => <Item item={item} />}
              keyExtractor={(item: MyPastListItemDto) => String(item.id)}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getMyPastAppointments}
                />
              }
            />
          ) : (
            <Text style={styles.no_data_text}>Geçmiş randevu bulunamadı.</Text>
          )}
        </>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
}

const styles = StyleSheet.create({
  item_container: {
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
  },
  selector_column: {
    marginEnd: 10,
    fontSize: 20,
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '10%',
    flex: 1,
  },
  info_column: {
    marginEnd: 10,
    fontSize: 20,
    flexDirection: 'column',
    display: 'flex',
    flexBasis: '90%',
    flex: 1,
  },
  no_data_text: {
    textAlign: 'center',
    marginTop: 20,
  },
});
