import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import HomeCard from './HomeCard';
import {COLORS, DIMENSIONS, PAGE_NAMES} from '../../constants';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';

const Home = ({navigation}: any) => {
  return (
    <ScrollView
      style={styles.scroll_container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.header_text}>
          TAMA'ya Hoşgeldin!{'\n'}John
        </Text>
        <Image
          source={require('../../assets/icon_transparent.png')}
          style={styles.header_logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.card_title}>Bildirimlerin</Text>
        <HomeCard
          icon="notebook-check-outline"
          headerText="Günlük Halet-i Ruhiye"
          statusColor="red"
          statusText="Bekliyor"
          bodyText="Cevaplaman gereken 3 adet soru seni bekliyor!"
          footerText="Kalan Süre: 2 saat"
          onPress={() => {
            navigation.navigate(PAGE_NAMES.HOME.DAILY_QUESTIONS);
          }}
          backgroundColor={COLORS.TRANSPARENT_RED}
        />
        <Text style={styles.card_title}>Tamamlananlar</Text>
        <HomeCard
          icon="medical-bag"
          headerText="Günlük İlaç Takibi"
          statusColor={COLORS.THEME_GREEN}
          statusText="Tamamlanmadı"
          bodyText="Bugün kullanman gereken ilaçları takip etmeyi unutma!"
          footerText={
            'A İlacı: 13:30, 19:30' + '\n' + 'B İlacı: 12:00, 18:00, 00:00'
          }
          onPress={() => {
            navigation.navigate(PAGE_NAMES.HOME.DAILY_MEDICINES);
          }}
        />
        <Text style={styles.card_title}>Yaklaşan Aktiviteler</Text>
        <HomeCard
          icon="calendar-month-outline"
          headerText="Yaklaşan Randevular"
          bodyText="Yaklaşan randevularını unutma!"
          footerText={'30 Ağustos 2023 14:30 - Dr. Anıl İBİŞ'}
          onPress={() => {
            navigation.navigate('appointments');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll_container: {backgroundColor: COLORS.THEME_GREEN, flex: 1},
  header: {
    height: (DIMENSIONS.AVAILABLE_HEIGHT * 25) / 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_text: {color: COLORS.TEXT},
  header_logo: {resizeMode: 'contain', height: '60%', width: 100},
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    // borderTopLeftRadius: 30,
    // borderBottomRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
  },
  card_title: {marginLeft: 20, marginTop: 5},
});

export default Home;
