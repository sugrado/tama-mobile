import React, {useState} from 'react';
import {Image, View, SafeAreaView, StyleSheet, Keyboard} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {Styles} from './Login.style';
import {COLORS} from '../../constants';
import Loading from '../../components/layout/Loading';

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string | undefined>(
    undefined,
  );
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const hasUsernameErrors = () =>
    usernameOrEmail !== undefined && usernameOrEmail.length < 3;

  const handleSendPasswordResetEmail = () => {
    if (hasUsernameErrors()) {
      return;
    }
    if (!usernameOrEmail) {
      showSnackBar('Lütfen kullanıcı adı ve parolanızı eksiksiz doldurun.');
      return;
    }
    setLoading(true);
    // TODO: api request
    setLoading(false);
    Keyboard.dismiss();
    showSnackBar('Şifre sıfırlama bağlantısı gönderildi.');
  };

  const showSnackBar = (text: string) => {
    setSnackbarText(text);
    setSnackbarVisible(true);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image
            style={Styles.login_header_logo}
            source={require('../../assets/icon_transparent.png')}
          />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>{'TAMA - '}</Text>
            {'Parolamı Unuttum'}
          </Text>
        </View>
        <View style={Styles.login_wrapper}>
          <View style={Styles.form}>
            <Text style={styles.information_text}>
              Şifrenizi yenilemek için e-posta adresinize tek kullanımlık bir
              bağlantı gönderilecektir. Bu bağlantı ile yeni bir şifre
              belirleyebilirsiniz.
            </Text>
            <View style={Styles.form_field}>
              <TextInput
                label="Kullanıcı adı veya e-posta"
                value={usernameOrEmail}
                onChangeText={input => setUsernameOrEmail(input)}
                theme={{
                  colors: {primary: COLORS.PRIMARY_THEME},
                  dark: false,
                }}
                style={Styles.input}
              />
              <HelperText
                padding="none"
                type="error"
                visible={hasUsernameErrors()}>
                Kullanıcı adı geçersiz!
              </HelperText>
            </View>
            <Button
              mode="contained"
              onPress={handleSendPasswordResetEmail}
              theme={{dark: false}}
              buttonColor={COLORS.BUTTON_COLOR}
              icon="refresh">
              Şifremi Yenile
            </Button>
          </View>
          <View style={Styles.footer}>
            <Image
              style={Styles.footer_logo}
              source={require('../../assets/neu_logo.png')}
            />
            <Text variant="bodySmall" style={Styles.login_footer_text}>
              Necmettin Erbakan Üniversitesi{'\n'}Tıp Fakültesi Ruh Sağlığı ve
              Hastalıkları{'\n'}Ana Bilim Dalı
            </Text>
            <Snackbar
              visible={snackbarVisible}
              duration={2000}
              onDismiss={() => setSnackbarVisible(false)}>
              {snackbarText}
            </Snackbar>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  information_text: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
});

export default ForgotPassword;
