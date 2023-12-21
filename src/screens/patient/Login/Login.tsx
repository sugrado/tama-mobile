import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useAuth} from '../../../contexts/AuthContext';
import {COLORS, FORM_ERROR_MESSAGES, PAGE_NAMES} from '../../../constants';
import TopBigIconLayout from '../../../components/layout/TopBigIconLayout';
import {CustomError} from '../../../utils/customErrors';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import Loading from '../../../components/layout/Loading';
import {useForm} from 'react-hook-form';
import SugradoFormField from '../../../components/core/SugradoFormField';

function Login({navigation}: any) {
  const {patientLogin} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const rules = {
    username: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      minLength: {
        value: 5,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(5),
      },
      maxLength: {
        value: 60,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(60),
      },
    },
    password: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      minLength: {
        value: 8,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(8),
      },
      maxLength: {
        value: 16,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(16),
      },
    },
  };

  const handleLogin = async (data: any) => {
    setLoading(true);
    const err = await patientLogin(
      String(data.username),
      String(data.password),
    );
    setError(err);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopBigIconLayout
        pageName="Giriş Yap"
        warningText="Lütfen kullanıcı adı ve parolanızı eksiksiz doldurun.">
        <SugradoFormField
          control={control}
          rules={rules.username}
          error={errors.username}
          name="username"
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Kullanıcı Adı"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              theme={{
                colors: {primary: COLORS.PRIMARY_THEME},
                dark: false,
              }}
            />
          )}
        />
        <SugradoFormField
          control={control}
          rules={rules.password}
          error={errors.password}
          name="password"
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Parola"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              theme={{
                colors: {primary: COLORS.PRIMARY_THEME},
                dark: false,
              }}
              secureTextEntry={true}
            />
          )}
        />
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
          onPress={handleSubmit(handleLogin)}
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
  loginButton: {width: '100%', marginTop: 25},
  input: {backgroundColor: '#fff', marginBottom: 20},
});

export default Login;
