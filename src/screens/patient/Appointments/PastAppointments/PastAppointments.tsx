import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import SugradoText from '../../../../components/core/SugradoText';
import Loading from '../../../../components/layout/Loading';
import SugradoButton from '../../../../components/core/SugradoButton';

type ItemProps = {item: any};

const Item = ({item}: ItemProps) => (
  <View
    style={{
      ...styles.item_container,
      backgroundColor: item.went
        ? COLORS.CARD_SUCCESS_BACKGROUND
        : COLORS.CARD_UNSUCCESS_BACKGROUND,
      borderColor: item.went ? COLORS.THEME_COLOR : COLORS.DARK_RED,
    }}>
    <Text style={styles.selector_column}>#{item.id}</Text>
    <View style={styles.info_column}>
      <Text>Doktor: {item.doctorName}</Text>
      <Text>Tarih: {item.date}</Text>
      <Text>Saat: {item.time}</Text>
      <Text>Durum: {item.went ? 'Gidildi' : 'Gidilmedi'}</Text>
    </View>
  </View>
);

export default function PastAppointments() {
  const [appointments, setAppointments] = useState<any[]>();
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setAppointments(dummyData);
  }, []);

  const handleSearch = async () => {
    // TODO: go to api and get filtered data
    if (searchText.length > 0) {
      setLoading(true);
      const filteredData = dummyData.filter(item => {
        return item.id
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      await wait(2000);
      setAppointments(filteredData);
      setLoading(false);
    } else {
      setLoading(true);
      setAppointments(dummyData);
      setLoading(false);
    }
  };
  function wait(ms: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }
  return (
    <>
      {loading && <Loading loading={loading} />}
      <View style={styles.search_container}>
        <SugradoText
          style={styles.search_bar}
          label="Ara"
          value={searchText}
          valueChange={e => {
            setSearchText(e);
          }}
          keyboardType="numeric"
          right={
            searchText && (
              <TextInput.Icon
                style={styles.search_clear_icon}
                icon="close-circle"
                color="gray"
                onPress={() => {
                  setLoading(true);
                  setSearchText('');
                  setAppointments(dummyData);
                  setLoading(false);
                }}
              />
            )
          }
          placeholder="Randevu numarası giriniz..."
        />
        <SugradoButton
          style={styles.filter_button}
          title="Filtrele"
          onPress={handleSearch}
          disabled={!searchText}
          icon="calendar-search"
        />
      </View>
      {appointments && appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <Text style={styles.no_data_text}>Geçmiş randevu bulunamadı.</Text>
      )}
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
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  search_bar: {
    width: '67%',
  },
  search_clear_icon: {
    marginTop: 20,
  },
  filter_button: {
    width: '30%',
    marginTop: 10,
  },
  no_data_text: {
    textAlign: 'center',
    marginTop: 20,
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
    id: 9999,
    doctorName: 'Jacenta Barritt',
    date: '22.03.2023',
    time: '3:35',
    went: false,
  },
];