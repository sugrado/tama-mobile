import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../../constants';
import Loading from '../../../components/layout/Loading';

type ItemProps = {item: any};

const Item = ({item}: ItemProps) => (
  <View style={styles.item_container}>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">İlaç Adı: </Text>
      <Text variant="bodyMedium">{item.name}</Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Doktor Notu: </Text>
      <Text variant="bodyMedium">{item.doctorNote}</Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Başlangıç: </Text>
      <Text variant="bodyMedium">{item.startDate}</Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Kullanım Süresi: </Text>
      <Text variant="bodyMedium">{item.usageTime}</Text>
    </View>
    <View style={styles.medicine_info_row}>
      <Text variant="titleMedium">Bağlı Olduğu Randevu: </Text>
      <Text variant="bodyMedium">#{item.appointmentOrder}</Text>
    </View>
  </View>
);

export default function MyMedicines() {
  const [medicines, setMedicines] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // TODO: go to api and get data
    setLoading(true);
    setMedicines(dummyData);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loading loading={loading} fillBackground={true} />}
      {medicines && medicines.length > 0 ? (
        <FlatList
          data={medicines}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <Text style={styles.no_data_text}>
          Kullanımda olduğunuz herhangi bir ilaç bulunmamaktadır.
        </Text>
      )}
    </>
  );
}

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

const dummyData = [
  {
    id: 1,
    name: 'Martes foina',
    appointmentOrder: 1,
    doctorNote: 'günde 2 kez sabah ve akşam',
    startDate: '30.08.2021',
    usageTime: '6 ay',
  },
  {
    id: 2,
    name: 'Canis lupus',
    appointmentOrder: 2,
    doctorNote: 'günde 1 kez öğlen',
    startDate: '30.08.2021',
    usageTime: 'Ömür Boyu',
  },
  {
    id: 3,
    name: 'Capreolus capreolus',
    appointmentOrder: 3,
    doctorNote: 'günde 3 kez sabah, öğlen ve akşam',
    startDate: '30.08.2021',
    usageTime: '3 ay',
  },
  {
    id: 4,
    name: 'Martes foina',
    appointmentOrder: 1,
    doctorNote: 'günde 2 kez sabah ve akşam',
    startDate: '30.08.2021',
    usageTime: '6 ay',
  },
  {
    id: 5,
    name: 'Canis lupus',
    appointmentOrder: 2,
    doctorNote: 'günde 1 kez öğlen',
    startDate: '30.08.2021',
    usageTime: '24 ay',
  },
  {
    id: 6,
    name: 'Capreolus capreolus',
    appointmentOrder: 3,
    doctorNote: 'günde 3 kez sabah, öğlen ve akşam',
    startDate: '30.08.2021',
    usageTime: '3 ay',
  },
];
