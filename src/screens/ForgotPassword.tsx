import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Button, TextInput, Text, HelperText} from 'react-native-paper';
import {COLORS} from '../constants';
import Loading from '../components/layout/Loading';
import TopBigIconLayout from '../components/layout/TopBigIconLayout';

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const hasUsernameErrors = () => email !== undefined && email.length < 3;

  const handleSendPasswordResetEmail = () => {
    if (hasUsernameErrors()) {
      return;
    }
    if (!email) {
      showSnackBar('Lütfen e-posta bilginizi doğru girin.');
      return;
    }
    setLoading(true);
    // TODO: api request
    setLoading(false);
    Keyboard.dismiss();
    showSnackBar(
      'Şifre sıfırlama bağlantısı gönderildi. Lütfen mail kutunuzu kontrol edin.',
    );
  };

  const showSnackBar = (text: string) => {
    setSnackbarText(text);
    setSnackbarVisible(true);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopBigIconLayout
        pageName="Parolamı Unuttum"
        snackbarVisible={snackbarVisible}
        warningText={snackbarText}
        setSnackbarVisible={() => {
          setSnackbarVisible(false);
        }}>
        <Text style={styles.information_text}>
          Şifrenizi yenilemek için e-posta adresinize tek kullanımlık bir
          bağlantı gönderilecektir. Bu bağlantı ile yeni bir şifre
          belirleyebilirsiniz.
        </Text>
        <View>
          <TextInput
            label="E-posta adresinizi girin..."
            value={email}
            onChangeText={input => setEmail(input)}
            theme={{
              colors: {primary: COLORS.PRIMARY_THEME},
              dark: false,
            }}
            style={styles.input}
          />
          <HelperText padding="none" type="error" visible={hasUsernameErrors()}>
            E-posta adresi geçersiz!
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
      </TopBigIconLayout>
    </>
  );
};

const styles = StyleSheet.create({
  information_text: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
  input: {backgroundColor: '#fff'},
});

export default ForgotPassword;