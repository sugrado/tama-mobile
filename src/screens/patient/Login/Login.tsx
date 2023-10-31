import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, TextInput, Text, HelperText} from 'react-native-paper';
import {useAuth} from '../../../contexts/AuthContext';
import {COLORS, PAGE_NAMES} from '../../../constants';
import TopBigIconLayout from '../../../components/layout/TopBigIconLayout';

function Login({navigation}: any) {
  const {login} = useAuth();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const hasUsernameErrors = () => username !== undefined && username.length < 3;
  const hasPasswordErrors = () => password !== undefined && password.length < 8;

  const handleLogin = () => {
    if (hasUsernameErrors() || hasPasswordErrors()) {
      return;
    }
    if (!username || !password) {
      setSnackbarVisible(true);
      return;
    }

    login(String(username), String(password));
  };

  return (
    <TopBigIconLayout
      pageName="Giriş Yap"
      snackbarVisible={snackbarVisible}
      warningText="Lütfen kullanıcı adı ve parolanızı eksiksiz doldurun."
      setSnackbarVisible={() => {
        setSnackbarVisible(false);
      }}>
      <View>
        <TextInput
          label="Kullanıcı adı"
          value={username}
          onChangeText={input => setUsername(input)}
          theme={{
            colors: {primary: COLORS.PRIMARY_THEME},
            dark: false,
          }}
          style={styles.input}
        />
        <HelperText padding="none" type="error" visible={hasUsernameErrors()}>
          Kullanıcı adı geçersiz!
        </HelperText>
      </View>
      <View>
        <TextInput
          label="Parola"
          value={password}
          onChangeText={input => setPassword(input)}
          theme={{
            colors: {primary: COLORS.PRIMARY_THEME},
            dark: false,
          }}
          secureTextEntry={true}
          style={styles.input}
        />
        <HelperText type="error" visible={hasPasswordErrors()} padding="none">
          Parola geçersiz!
        </HelperText>
      </View>
      <View style={styles.forgot_password}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PAGE_NAMES.PATIENT.AUTH.FORGOT_PASSWORD);
          }}>
          <Text style={styles.forgot_password_text}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={() => handleLogin()}
        style={styles.loginButton}
        theme={{dark: false}}
        buttonColor={COLORS.BUTTON_COLOR}
        icon="login-variant">
        Giriş Yap
      </Button>
      <Button
        mode="elevated"
        onPress={() => {
          navigation.navigate(PAGE_NAMES.PATIENT.AUTH.FIRST_APPOINTMENT);
        }}
        style={styles.firstAppointmentButton}
        theme={{dark: false}}
        buttonColor={COLORS.THEME_COLOR}
        textColor="#fff"
        icon="calendar-plus">
        İlk Randevu
      </Button>
    </TopBigIconLayout>
  );
}

const styles = StyleSheet.create({
  forgot_password: {width: '100%', alignItems: 'flex-end'},
  forgot_password_text: {
    fontWeight: 'bold',
    color: COLORS.BUTTON_COLOR,
  },
  loginButton: {width: '100%', marginTop: 30},
  firstAppointmentButton: {width: '100%', marginTop: 30},
  input: {backgroundColor: '#fff'},
});

export default Login;
