import {View, SafeAreaView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Snackbar, Text} from 'react-native-paper';
import {COLORS, DIMENSIONS} from '../../constants';

type TopBigIconLayoutProps = {
  children: any;
  snackbarVisible?: boolean;
  setSnackbarVisible?: () => void;
  warningText?: string;
  pageName: string;
};

const TopBigIconLayout = ({
  children,
  snackbarVisible,
  setSnackbarVisible,
  warningText,
  pageName,
}: TopBigIconLayoutProps) => {
  return (
    <SafeAreaView style={styles.login_container}>
      <View style={styles.login_header}>
        <Image
          style={styles.login_header_logo}
          source={require('../../assets/icon_transparent.png')}
        />
        <Text style={styles.login_header_text}>
          <Text style={styles.login_header_text_bold}>{'TAMA | '}</Text>
          {pageName}
        </Text>
      </View>
      <View style={styles.login_wrapper}>
        <View style={styles.form}>{children}</View>
        <View style={styles.footer}>
          <Image
            style={styles.footer_logo}
            source={require('../../assets/neu_logo.png')}
          />
          <Text variant="bodySmall" style={styles.login_footer_text}>
            Necmettin Erbakan Üniversitesi{'\n'}Tıp Fakültesi Ruh Sağlığı ve
            Hastalıkları{'\n'}Ana Bilim Dalı
          </Text>
          {snackbarVisible && setSnackbarVisible && (
            <Snackbar
              visible={snackbarVisible}
              duration={2000}
              onDismiss={setSnackbarVisible}>
              {warningText}
            </Snackbar>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  login_header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: COLORS.THEME_COLOR,
  },
  login_header_logo: {
    height: (DIMENSIONS.HEIGHT * 1.2) / 10,
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
  login_wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 15,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 280,
  },
  login_footer_text: {
    color: '#808080',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footer_logo: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});

export default TopBigIconLayout;
