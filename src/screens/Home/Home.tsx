import {View} from 'react-native';
import React from 'react';
import HomeCard from './HomeCard';
import {COLORS, DIMENSIONS} from '../../constants';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';

const Home = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: COLORS.THEME_GREEN, flex: 1}}>
      <View
        style={{
          height: (DIMENSIONS.AVAILABLE_HEIGHT * 25) / 100,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant="headlineSmall" style={{color: COLORS.TEXT}}>
          TAMA'ya Hoşgeldin!{'\n'}John
        </Text>
        <Image
          source={require('../../assets/icon_transparent.png')}
          style={{resizeMode: 'contain', height: '60%', width: 100}}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 30,
          flex: 1,
        }}>
        <HomeCard
          icon="notebook-check-outline"
          headerText="Günlük Halet-i Ruhiye"
          statusColor="red"
          statusText="Bekliyor"
          bodyText="Cevaplaman gereken 3 adet soru seni bekliyor!"
          footerText="Kalan Süre: 2 saat"
          navigateUrl="daily-questions"
        />
        <HomeCard
          icon="medical-bag"
          headerText="Günlük İlaç Takibi"
          statusColor="red"
          statusText="Tamamlanmadı"
          bodyText="Bugün kullanman gereken ilaçları takip etmeyi unutma!"
          footerText={
            'Parol: 13:30, 19:30' + '\n' + 'Minoset Plus: 12:00, 18:00, 00:00'
          }
          navigateUrl="daily-medicines"
        />
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
    </View>
  );
};

export default Home;
