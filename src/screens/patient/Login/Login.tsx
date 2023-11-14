import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, TextInput, Text, HelperText} from 'react-native-paper';
import {useAuth} from '../../../contexts/AuthContext';
import {COLORS, PAGE_NAMES} from '../../../constants';
import TopBigIconLayout from '../../../components/layout/TopBigIconLayout';
import {CustomError} from '../../../utils/customErrors';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import Loading from '../../../components/layout/Loading';

function Login({navigation}: any) {
  const {patientLogin} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [username, setUsername] = useState<string | undefined>(
    'gorkem.arik' /*undefined */,
  );
  const [password, setPassword] = useState<string | undefined>('Passw0rd');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const hasUsernameErrors = () => username !== undefined && username.length < 3;
  const hasPasswordErrors = () => password !== undefined && password.length < 8;

  const handleLogin = async () => {
    if (hasUsernameErrors() || hasPasswordErrors()) {
      return;
    }
    if (!username || !password) {
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    const err = await patientLogin(String(username), String(password));
    setError(err);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
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
              navigation.navigate(PAGE_NAMES.PORTALS.FORGOT_PASSWORD);
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
      </TopBigIconLayout>
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
}

const styles = StyleSheet.create({
  forgot_password: {width: '100%', alignItems: 'flex-end'},
  forgot_password_text: {
    fontWeight: 'bold',
    color: COLORS.BUTTON_COLOR,
  },
  loginButton: {width: '100%', marginTop: 30},
  input: {backgroundColor: '#fff'},
});

export default Login;
