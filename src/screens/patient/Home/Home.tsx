import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import HomeCard from './HomeCard';
import {COLORS, DIMENSIONS, PAGE_NAMES} from '../../../constants';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../../../contexts/AuthContext';
import {getHomeScreenData} from '../../../api/patients/patient';
import {CustomError, isCritical} from '../../../utils/customErrors';
import {GetHomeScreenDataResponse} from '../../../api/patients/dtos/get-home-screen-data-response.dto';
import Loading from '../../../components/layout/Loading';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {useFocusEffect} from '@react-navigation/native';
import {
  FormatType,
  formatDate,
  generateId,
  getEndOfTheDayCountdown,
} from '../../../utils/helpers';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';

const Home = ({navigation}: any) => {
  const {userInfo} = useAuth();
  const [error, setError] = useState<CustomError | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [completedCardList, setCompletedCardList] = useState<JSX.Element[]>([]);
  const [unCompletedCardList, setUnCompletedCardList] = useState<JSX.Element[]>(
    [],
  );
  const [comingActivitiesList, setComingActivitiesList] = useState<
    JSX.Element[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      resetLists();
      loadScreen();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const resetLists = () => {
    setCompletedCardList([]);
    setUnCompletedCardList([]);
    setComingActivitiesList([]);
  };

  const loadScreen = async () => {
    setLoading(true);
    const res = await getHomeScreenData();
    if (res?.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    setLists(res.data!);
    setError(null);
    setLoading(false);
  };

  const setLists = (dataResponse: GetHomeScreenDataResponse) => {
    const dailyQuestionCard = (
      <HomeCard
        key={generateId()}
        icon="notebook-check-outline"
        headerText="Günlük Halet-i Ruhiye"
        backgroundColor={
          dataResponse.countOfDailyQuestionForAnswer > 0
            ? COLORS.CARD_UNSUCCESS_BACKGROUND
            : COLORS.CARD_SUCCESS_BACKGROUND
        }
        statusColor={
          dataResponse.countOfDailyQuestionForAnswer > 0
            ? COLORS.DARK_RED
            : COLORS.THEME_COLOR
        }
        statusText={
          dataResponse.countOfDailyQuestionForAnswer > 0
            ? 'Bekliyor'
            : 'Tamamlandı'
        }
        bodyText={
          dataResponse.countOfDailyQuestionForAnswer > 0
            ? `Cevaplaman gereken ${dataResponse.countOfDailyQuestionForAnswer} adet soru seni bekliyor!`
            : 'Bugün cevaplaman gereken bütün soruları cevapladın. Tebrikler!'
        }
        footerText={
          dataResponse.countOfDailyQuestionForAnswer > 0
            ? `Kalan Süre: ${getEndOfTheDayCountdown()}`
            : ''
        }
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PATIENT.HOME.DAILY_QUESTIONS);
        }}
      />
    );
    const medicinesText = '';
    dataResponse.dailyMedicinesToUse.forEach(medicine => {
      medicinesText.concat(medicine.name + ': ' + medicine.usageTimes + '\n');
    });
    const dailyMedicineCard = (
      <HomeCard
        key={generateId()}
        icon="medical-bag"
        headerText="Günlük İlaç Takibi"
        statusColor={
          dataResponse.dailyMedicinesToUse.length > 0
            ? COLORS.DARK_RED
            : COLORS.THEME_COLOR
        }
        statusText={
          dataResponse.dailyMedicinesToUse.length > 0
            ? 'Bekliyor'
            : 'Tamamlandı'
        }
        bodyText={
          dataResponse.dailyMedicinesToUse.length > 0
            ? 'Bugün kullanman gereken ilaçları takip etmeyi unutma!'
            : 'Bugün kullanman gereken bütün ilaçları kullandın. Tebrikler!'
        }
        footerText={medicinesText}
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PATIENT.HOME.DAILY_MEDICINES);
        }}
      />
    );
    const appointmentCard = (
      <HomeCard
        key={generateId()}
        icon="calendar-month-outline"
        headerText="Randevu Hatırlatıcısı"
        bodyText={
          dataResponse.appointmentReminder
            ? 'Yaklaşan randevunu unutma!'
            : 'Randevu almak için tıkla!'
        }
        footerText={
          dataResponse.appointmentReminder
            ? `Tarih: ${formatDate(
                dataResponse.appointmentReminder.takenDate,
                FormatType.DATE,
              )}\nSaat: ${formatDate(
                dataResponse.appointmentReminder.probableStartTime,
                FormatType.TIME,
              )} - ${formatDate(
                dataResponse.appointmentReminder.probableEndTime,
                FormatType.TIME,
              )}\nDoktor: ${dataResponse.appointmentReminder.doctorFullName}`
            : 'Henüz randevu almadın. Almak için buraya tıklayabilirsin!'
        }
        onPress={() => {
          navigation.navigate(
            PAGE_NAMES.PATIENT.APPOINTMENTS.APPOINTMENT_TOP_TAB,
          );
        }}
      />
    );

    let comingActivities: JSX.Element[] = [];
    let completed: JSX.Element[] = [];
    let uncompleted: JSX.Element[] = [];

    if (dataResponse.countOfDailyQuestionForAnswer > 0) {
      uncompleted.push(dailyQuestionCard);
    } else {
      completed.push(dailyQuestionCard);
    }

    if (dataResponse.dailyMedicinesToUse.length > 0) {
      uncompleted.push(dailyMedicineCard);
    } else {
      completed.push(dailyMedicineCard);
    }

    comingActivities.push(appointmentCard);

    setCompletedCardList(prev => {
      return [...prev, ...completed];
    });
    setUnCompletedCardList(prev => {
      return [...prev, ...uncompleted];
    });
    setComingActivitiesList(prev => {
      return [...prev, ...comingActivities];
    });
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={loadScreen} />
      ) : (
        <ScrollView
          style={styles.scroll_container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.header_text}>
              TAMA'ya Hoşgeldin!{'\n'}
              {userInfo!.firstName}
            </Text>
            <Image
              source={require('../../../assets/icon_transparent.png')}
              style={styles.header_logo}
            />
          </View>
          <View style={styles.content}>
            {unCompletedCardList.length > 0 && (
              <Text style={styles.card_title}>Bildirimlerin</Text>
            )}
            {unCompletedCardList.map(card => {
              return card;
            })}
            {completedCardList.length > 0 && (
              <Text style={styles.card_title}>Tamamlananlar</Text>
            )}
            {completedCardList.map(card => {
              return card;
            })}
            {comingActivitiesList.length > 0 && (
              <Text style={styles.card_title}>Yaklaşan Aktiviteler</Text>
            )}
            {comingActivitiesList.map(card => {
              return card;
            })}
          </View>
        </ScrollView>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: COLORS.THEME_COLOR,
    flex: 1,
  },
  header: {
    // TODO: will be column instead of space between in the future
    height: (DIMENSIONS.AVAILABLE_HEIGHT * 25) / 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_text: {
    color: COLORS.TEXT,
  },
  header_logo: {
    resizeMode: 'contain',
    height: '60%',
    width: 100,
  },
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
  card_title: {
    marginLeft: 20,
    marginTop: 5,
  },
});

export default Home;
