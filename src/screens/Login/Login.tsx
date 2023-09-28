import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {DIMENSIONS} from '../../constants';
import {Button, TextInput, Text} from 'react-native-paper';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <StatusBar backgroundColor="#4D7E3E" />
      <SafeAreaView style={styles.login_container}>
        <View style={styles.login_header}>
          <Image
            style={styles.login_header_logo}
            source={require('../../assets/icon_transparent.png')}
          />
          <Text style={styles.login_header_text}>
            <Text style={styles.login_header_text_bold}>{'TAMA - '}</Text>
            {'Giriş Yap'}
          </Text>
        </View>
        <View style={styles.login_wrapper}>
          <View style={styles.form}>
            <TextInput
              label="Kullanıcı adı"
              value={username}
              onChangeText={input => setUsername(input)}
              theme={{
                colors: {primary: 'green'},
              }}
              style={styles.input}
            />
            <TextInput
              label="Parola"
              value={password}
              onChangeText={input => setPassword(input)}
              theme={{
                colors: {primary: 'green'},
              }}
              secureTextEntry={true}
              style={styles.input}
            />
            <View style={styles.forgot_password}>
              <TouchableOpacity>
                <Text style={styles.forgot_password_text}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              onPress={() => console.log('pressed')}
              style={styles.loginButton}
              buttonColor="#4D7E3E"
              icon="login-variant">
              Giriş Yap
            </Button>
            <Button
              mode="elevated"
              onPress={() => console.log('pressed')}
              style={styles.firstAppointmentButton}
              buttonColor="#2b5758"
              textColor="#fff"
              icon="calendar-plus">
              İlk Randevu
            </Button>
          </View>
          <View style={styles.footer}>
            <Image
              style={styles.footer_logo}
              source={require('../../assets/neu_logo.png')}
            />
            <Text variant="bodySmall" style={styles.login_footer_text}>
              Necmettin Erbakan Üniversitesi{'\n'}Tıp Fakültesi Ruh Sağlığı ve
              Hastalıkları{'\n'}Ana Bilim Dalı
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  forgot_password: {width: '100%', alignItems: 'flex-end'},
  forgot_password_text: {
    fontWeight: 'bold',
    color: '#4D7E3E',
  },
  loginButton: {width: '100%', marginTop: 30},
  firstAppointmentButton: {width: '100%', marginTop: 30},
  input: {backgroundColor: '#fff', marginBottom: 10},
  login_container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  login_header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#4D7E3E',
  },
  login_header_logo: {
    height: (DIMENSIONS.height * 1.2) / 10,
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

export default Login;
