import React, {useCallback, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../../constants';
import Loading from '../../../components/layout/Loading';
import {getMyMedicines} from '../../../api/patients/patient';
import {CustomError, isCritical} from '../../../utils/customErrors';
import {GetMyMedicinesDto} from '../../../api/patients/dtos/get-my-medicines.dto';
import {FormatType, formatDate} from '../../../utils/helpers';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {useFocusEffect} from '@react-navigation/native';

type ItemProps = {item: GetMyMedicinesDto};

const Item = ({item}: ItemProps) => (
  <View style={styles.item_container}>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">İlaç Adı: </Text>
      <Text variant="bodyMedium">{item.medicineName}</Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Başlangıç Tarihi: </Text>
      <Text variant="bodyMedium">
        {formatDate(item.startDate, FormatType.DATE)}
      </Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Bitiş Tarihi: </Text>
      <Text variant="bodyMedium">
        {item.endDate != null
          ? formatDate(item.endDate, FormatType.DATE)
          : 'Ömür Boyu'}
      </Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Kullanım Süreleri: </Text>
    </View>
    {item.times.map((time, index) => (
      <Text variant="bodyMedium" key={index}>
        {time.time}
        {index !== item.times.length - 1 ? ', ' : ''}
      </Text>
    ))}
  </View>
);

export default function MyMedicines() {
  const [medicines, setMedicines] = useState<GetMyMedicinesDto[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  useFocusEffect(
    useCallback(() => {
      getMedicines();
    }, []),
  );

  const getMedicines = async () => {
    setLoading(true);
    const response = await getMyMedicines();
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    setMedicines(response.data);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMedicines} />
      ) : (
        <FlatList
          data={medicines}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item: GetMyMedicinesDto) => String(item.id)}
          ListEmptyComponent={EmptyList}
        />
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
}

const EmptyList = () => (
  <Text style={styles.no_data_text}>
    Kullanımda olduğunuz ilaç bulunmamaktadır.
  </Text>
);

const styles = StyleSheet.create({
  item_container: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    backgroundColor: COLORS.CARD_SUCCESS_BACKGROUND,
    borderColor: COLORS.THEME_COLOR,
  },
  history_icon: {
    marginEnd: 10,
    fontSize: 20,
  },
  medicine_info_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  no_data_text: {
    textAlign: 'center',
    marginTop: 20,
  },
});
