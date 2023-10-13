import React, {useEffect, useState} from 'react';
import {FlatList, View, SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants';

type ItemProps = {item: any};

const Item = ({item}: ItemProps) => (
  <View
    style={{
      ...styles.item_container,
      backgroundColor: item.went
        ? COLORS.THEME_TRANSPARENT_COLOR
        : COLORS.TRANSPARENT_RED,
      borderColor: item.went ? COLORS.THEME_GREEN : COLORS.DARK_RED,
    }}>
    <MaterialCommunityIcons
      name="history"
      size={24}
      style={styles.history_icon}
      color="gray"
    />
    <View>
      <Text>Doktor: {item.doctorName}</Text>
      <Text>Tarih: {item.date}</Text>
      <Text>Saat: {item.time}</Text>
      <Text>Durum: {item.went ? 'Gidildi' : 'Gidilmedi'}</Text>
    </View>
  </View>
);

export default function PastAppointments() {
  const [appointments, setAppointments] = useState<any[]>();
  useEffect(() => {
    setAppointments(dummyData);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={appointments}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item: any) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
  },
  history_icon: {
    marginEnd: 10,
  },
});

const dummyData = [
  {
    id: 1,
    doctorName: 'Robinia Bretton',
    date: '23.07.2023',
    time: '12:49',
    went: true,
  },
  {
    id: 2,
    doctorName: 'Olive Palfreeman',
    date: '02.07.2023',
    time: '23:56',
    went: false,
  },
  {
    id: 3,
    doctorName: 'Etty Chetwind',
    date: '07.03.2023',
    time: '2:35',
    went: true,
  },
  {
    id: 4,
    doctorName: 'Cyndia Davidwitz',
    date: '03.11.2022',
    time: '7:36',
    went: false,
  },
  {
    id: 5,
    doctorName: 'Michele Safhill',
    date: '25.10.2022',
    time: '11:28',
    went: true,
  },
  {
    id: 6,
    doctorName: 'Aleece Macauley',
    date: '06.06.2023',
    time: '13:28',
    went: true,
  },
  {
    id: 7,
    doctorName: 'Colly Fisbburne',
    date: '24.02.2023',
    time: '14:04',
    went: true,
  },
  {
    id: 8,
    doctorName: 'Audry Drejer',
    date: '23.03.2023',
    time: '23:27',
    went: false,
  },
  {
    id: 9,
    doctorName: 'Wynn Nardrup',
    date: '12.05.2023',
    time: '3:10',
    went: false,
  },
  {
    id: 10,
    doctorName: 'Jacenta Barritt',
    date: '22.03.2023',
    time: '3:35',
    went: false,
  },
];
