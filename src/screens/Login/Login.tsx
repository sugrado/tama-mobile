import React, {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import InputField from '../../components/InputField';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.loginIcon}
        />
        <Text style={styles.headerText}>Giriş Yap</Text>
        <InputField
          label="Kullanıcı Adı"
          value={username}
          valueChange={input => setUsername(input)}
          keyboardType="default"
          style={styles.input}
        />
        <InputField
          label="Parola"
          style={styles.input}
          value={password}
          valueChange={input => setPassword(input)}
          secureTextEntry={true}
        />
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
          style={styles.loginButton}
          buttonColor="#2196F3"
          textColor="#fff"
          icon="calendar-plus">
          İlk Randevu
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginVertical: 6,
    width: '80%', // İsteğe bağlı olarak ekran genişliğine sığdırın
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 24,
    width: '60%', // İsteğe bağlı olarak ekran genişliğine sığdırın
  },
  loginIcon: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 30,
  },
});

export default Login;
