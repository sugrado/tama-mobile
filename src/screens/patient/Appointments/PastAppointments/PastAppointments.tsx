import React, {memo, useCallback, useState} from 'react';
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

const Item = memo(({item}: ItemProps) => {
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
});

const EmptyList = () => (
  <Text style={styles.no_data_text}>Geçmiş randevunuz bulunmamaktadır.</Text>
);

export default function PastAppointments() {
  const [appointments, setAppointments] = useState<MyPastListItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getMyPastAppointments(0);
      setPage(0);
    }, []),
  );

  const getMyPastAppointments = async (pageNum: number) => {
    setLoading(true);
    const res = await getMyPast(pageNum, 10);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setError(null);
    setHasNext(res.data!.hasNext);
    setAppointments(prev =>
      pageNum === 0 ? res.data!.items : [...prev, ...res.data!.items],
    );
    setLoading(false);
  };

  const getMoreAppointments = async () => {
    if (!hasNext) {
      return;
    }
    await getMyPastAppointments(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage
          retry={() => {
            getMyPastAppointments(0);
            setPage(0);
          }}
        />
      ) : (
        <FlatList
          data={appointments}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item: MyPastListItemDto) => String(item.id)}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getMyPastAppointments(0);
                setPage(0);
              }}
            />
          }
          onEndReached={getMoreAppointments}
          ListEmptyComponent={EmptyList}
        />
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
