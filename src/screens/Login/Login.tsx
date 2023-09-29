import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {Styles} from './Login.style';
import {useAuth} from '../../contexts/AuthContext';
import {COLORS} from '../../constants';

function Login() {
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
    <>
      <StatusBar backgroundColor={COLORS.THEME_GREEN} />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image
            style={Styles.login_header_logo}
            source={require('../../assets/icon_transparent.png')}
          />
          <Text style={Styles.login_header_text}>
            <Text style={Styles.login_header_text_bold}>{'TAMA - '}</Text>
            {'Giriş Yap'}
          </Text>
        </View>
        <View style={Styles.login_wrapper}>
          <View style={Styles.form}>
            <View style={Styles.form_field}>
              <TextInput
                label="Kullanıcı adı"
                value={username}
                onChangeText={input => setUsername(input)}
                theme={{
                  colors: {primary: 'green'},
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
            <View style={Styles.form_field}>
              <TextInput
                label="Parola"
                value={password}
                onChangeText={input => setPassword(input)}
                theme={{
                  colors: {primary: 'green'},
                  dark: false,
                }}
                secureTextEntry={true}
                style={Styles.input}
              />
              <HelperText
                type="error"
                visible={hasPasswordErrors()}
                padding="none">
                Parola geçersiz!
              </HelperText>
            </View>
            <View style={Styles.forgot_password}>
              <TouchableOpacity>
                <Text style={Styles.forgot_password_text}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              onPress={() => handleLogin()}
              style={Styles.loginButton}
              theme={{dark: false}}
              buttonColor={COLORS.THEME_GREEN}
              icon="login-variant">
              Giriş Yap
            </Button>
            <Button
              mode="elevated"
              onPress={() => console.log('pressed')}
              style={Styles.firstAppointmentButton}
              theme={{dark: false}}
              buttonColor="#2b5758"
              textColor="#fff"
              icon="calendar-plus">
              İlk Randevu
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
              Lütfen kullanıcı adı ve parolanızı eksiksiz doldurun.
            </Snackbar>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Login;
