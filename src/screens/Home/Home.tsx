import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {Badge, Divider, List, Text} from 'react-native-paper';
import SugradoButton from '../../components/SugradoButton';
import {COLORS, DIMENSIONS} from '../../constants';
import {useAuth} from '../../contexts/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
  const {userInfo} = useAuth();
  const [moodsAnswered, setMoodsAnswered] = useState(false);
  const [medicsUsed, setMedicsUsed] = useState(false);
  const [numOfMedicToUse, setNumOfMedicToUse] = useState(2);
  const [numOfMoodAnswerToAnswer, setMumOfMoodAnswerToAnswer] = useState(3);

  useEffect(() => {
    //TODO: Go to api and get daily mood and medic data. if questions are not answered, set expanded to true
    //! For Example:
    // axiosInstance.get('/daily-status').then((res: any) => {
    //   if (res.answeredMoodAnswerCount === res.totalMoodAnswerCount) {
    //     setMoodsAnswered(true);
    //   }
    //   if (res.usedMedicineCount === res.totalMedicineCount) {
    //     setMedicsUsed(true);
    //   }
    //   setNumOfMedicToUse(res.totalMedicineCount - res.usedMedicineCount);
    //   setMumOfMoodAnswerToAnswer(
    //     res.totalMoodAnswerCount - res.answeredMoodAnswerCount,
    //   );
    // });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login_header}>
        <Text variant="headlineMedium" style={{color: '#C9EFC7'}}>
          Merhaba, {userInfo?.firstName}{' '}
          <MaterialCommunityIcons name="hand-wave" size={25} color="#ffcc4d" />
          {'\n'}
          <Text variant="titleMedium" style={{color: 'white'}}>
            TAMA'ya Hoşgeldin!{' '}
          </Text>
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.login_header_logo}
            source={require('../../assets/icon_transparent.png')}
          />
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 30,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          marginTop: -10,
        }}>
        <List.Accordion
          style={styles.accordion}
          expanded={!moodsAnswered}
          theme={{colors: {primary: 'green'}}}
          title="Günlük Halet-i Ruhiye"
          titleStyle={{color: moodsAnswered ? COLORS.THEME_GREEN : 'black'}}
          left={props => (
            <List.Icon
              {...props}
              icon="notebook-check-outline"
              color={moodsAnswered ? COLORS.THEME_GREEN : 'black'}
            />
          )}
          right={props =>
            moodsAnswered ? (
              <List.Icon
                {...props}
                icon="check-circle"
                color={COLORS.THEME_GREEN}
              />
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Badge>{numOfMoodAnswerToAnswer}</Badge>
              </View>
            )
          }>
          <List.Item
            title="Nasıl Hissediyorsun?"
            right={() => (
              <SugradoButton
                title="Cevapla"
                onPress={() => console.log('basıldı')}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Kaç Saat Uyudun?"
            right={() => (
              <SugradoButton
                title="Cevapla"
                onPress={() => console.log('basıldı')}
              />
            )}
          />
          <Divider />
          <List.Item
            title="İntihar Düşüncen Var mı?"
            right={() => (
              <SugradoButton
                title="Cevapla"
                onPress={() => console.log('basıldı')}
              />
            )}
          />
        </List.Accordion>

        <List.Accordion
          titleStyle={{color: medicsUsed ? COLORS.THEME_GREEN : 'black'}}
          style={styles.accordion}
          expanded={!medicsUsed}
          theme={{colors: {primary: 'green'}}}
          title="Günlük İlaç Takibi"
          left={props => (
            <List.Icon
              {...props}
              icon="medical-bag"
              color={medicsUsed ? COLORS.THEME_GREEN : 'black'}
            />
          )}
          right={props =>
            medicsUsed ? (
              <List.Icon
                {...props}
                icon="check-circle"
                color={COLORS.THEME_GREEN}
              />
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Badge>{numOfMedicToUse}</Badge>
              </View>
            )
          }>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4D7E3E',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  login_header_logo: {
    height: (DIMENSIONS.height * 0.8) / 10,
    resizeMode: 'contain',
  },
  login_header_text: {
    marginTop: 15,
    color: '#f0f0f0',
    fontSize: 16,
  },
  login_header_text_bold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accordion: {
    backgroundColor: 'gray',
    borderRadius: 30,
  },
});

//!
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import Animated, {
//   useAnimatedRef,
//   useSharedValue,
//   useAnimatedStyle,
//   runOnUI,
//   measure,
//   useDerivedValue,
//   withTiming,
//   SharedValue,
// } from 'react-native-reanimated';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// type Props = {
//   progress: Readonly<SharedValue<0 | 1>>;
// };

// const Chevron = ({progress}: Props) => {
//   const iconStyle = useAnimatedStyle(() => ({
//     transform: [{rotate: `${progress.value * -180}deg`}],
//   }));
//   return (
//     <Animated.View style={iconStyle}>
//       <Ionicons name="chevron-down-circle-sharp" style={styles.chevron} />
//     </Animated.View>
//   );
// };

// const Home = () => {
//   const data = [{title: 'abc', content: ['asdasdas']}];
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: 'white',
//       }}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {data.map((value, index) => {
//           return <Accordion value={value} key={index} />;
//         })}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default Home;

// const Accordion = ({value}: any) => {
//   const listRef = useAnimatedRef();
//   const heightValue = useSharedValue(0);
//   const open = useSharedValue(false);
//   const progress = useDerivedValue(() =>
//     open.value ? withTiming(1) : withTiming(0),
//   );

//   const heightAnimationStyle = useAnimatedStyle(() => ({
//     height: heightValue.value,
//   }));

//   return (
//     <View style={styles.container}>
//       <Pressable
//         onPress={() => {
//           if (heightValue.value === 0) {
//             runOnUI(() => {
//               'worklet';
//               heightValue.value = withTiming(measure(listRef)!.height);
//             })();
//           } else {
//             heightValue.value = withTiming(0);
//           }
//           open.value = !open.value;
//         }}
//         style={styles.titleContainer}>
//         <Text style={styles.textTitle}>{value?.title}</Text>
//         <Chevron progress={progress} />
//       </Pressable>
//       <Animated.View style={heightAnimationStyle}>
//         <Animated.View style={styles.contentContainer} ref={listRef}>
//           {value.content.map((v: any, i: any) => {
//             return (
//               <View key={i} style={styles.content}>
//                 <Text style={styles.textContent}>{v}</Text>
//               </View>
//             );
//           })}
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chevron: {
//     width: 24,
//     height: 24,
//   },
//   container: {
//     backgroundColor: '#E3EDFB',
//     marginHorizontal: 10,
//     marginVertical: 10,
//     borderRadius: 14,
//     overflow: 'hidden',
//   },
//   textTitle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   titleContainer: {
//     padding: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     position: 'absolute',
//     width: '100%',
//     top: 0,
//   },
//   content: {
//     padding: 20,
//     backgroundColor: '#D6E1F0',
//   },
//   textContent: {
//     fontSize: 14,
//     color: 'black',
//   },
// });
