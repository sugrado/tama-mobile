import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, DIMENSIONS, PAGE_NAMES} from '../constants';
import {Button, Text} from 'react-native-paper';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.header_image}
          source={require('../assets/icon_transparent.png')}
        />
      </View>
      <Text variant="bodyLarge" style={styles.header_text}>
        TAMA'ya Hoşgeldiniz!{'\n'}Lütfen giriş yöntemini seçiniz.
      </Text>
      <View style={styles.body}>
        <Button
          onPress={() => {
            navigation.navigate(PAGE_NAMES.PORTALS.PATIENT);
          }}
          style={[styles.body_element, styles.button]}
          buttonColor={COLORS.TEXT}
          textColor={COLORS.BUTTON_COLOR}
          theme={{dark: false}}>
          Hasta
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(PAGE_NAMES.PORTALS.RELATIVE);
          }}
          style={[styles.body_element, styles.button]}
          buttonColor={COLORS.TEXT}
          textColor={COLORS.BUTTON_COLOR}
          theme={{dark: false}}>
          Hasta Yakını
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(PAGE_NAMES.PORTALS.DOCTOR);
          }}
          style={styles.button}
          buttonColor={COLORS.TEXT}
          textColor={COLORS.BUTTON_COLOR}
          theme={{dark: false}}>
          Doktor
        </Button>
      </View>
      <View style={styles.footer}>
        <Image
          style={styles.footer_logo}
          source={require('../assets/neu_logo.png')}
        />
        <Text variant="bodyMedium" style={styles.footer_text}>
          Necmettin Erbakan Üniversitesi{'\n'}Tıp Fakültesi Ruh Sağlığı ve
          Hastalıkları{'\n'}Ana Bilim Dalı
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.THEME_COLOR,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    alignItems: 'center',
  },
  header_text: {
    color: COLORS.TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header_image: {
    height: (DIMENSIONS.HEIGHT * 25) / 100,
    resizeMode: 'contain',
  },
  body: {
    width: '70%',
  },
  body_element: {
    marginBottom: 30,
  },
  footer: {
    alignItems: 'center',
  },
  footer_text: {
    color: COLORS.TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer_logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
  },
});

export default WelcomeScreen;
