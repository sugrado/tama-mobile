import React, {useState} from 'react';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import {useForm} from 'react-hook-form';
import {FORM_ERROR_MESSAGES, REGEXES} from '../../../constants';
import {StyleSheet, View} from 'react-native';
import SugradoFormField from '../../../components/core/SugradoFormField';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import {CustomError, InterfaceError} from '../../../utils/customErrors';
import SugradoButton from '../../../components/core/SugradoButton';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import Loading from '../../../components/layout/Loading';
import {useAuth} from '../../../contexts/AuthContext';

const Register = () => {
  const {relativeRegister} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',
      phoneNumber: '',
    },
  });

  const rules = {
    firstName: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 60,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(60),
      },
    },
    lastName: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 60,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(60),
      },
    },
    email: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      pattern: {
        value: REGEXES.EMAIL,
        message: FORM_ERROR_MESSAGES.EMAIL,
      },
      maxLength: {
        value: 60,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(60),
      },
    },
    phoneNumber: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 15,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(15),
      },
      pattern: {
        value: REGEXES.TR_PHONE_NUMBER,
        message: FORM_ERROR_MESSAGES.PHONE_NUMBER,
      },
    },
    password: {
      required: 'Şifrenizi giriniz',
      minLength: {
        value: 8,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(8),
      },
      maxLength: {
        value: 16,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(16),
      },
    },
    passwordAgain: {
      required: 'Şifrenizi tekrar giriniz',
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

  const onSubmit = async (data: any) => {
    if (data.password !== data.passwordAgain) {
      setError({message: 'Parolalar uyuşmuyor'} as InterfaceError);
      return;
    }
    setLoading(true);
    const responseError = await relativeRegister({user: data});
    if (responseError) {
      setError(responseError);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopSmallIconLayout pageName="Hasta Yakını Kaydı">
        <View style={styles.container}>
          <SugradoFormField
            control={control}
            rules={rules.firstName}
            error={errors.firstName}
            name="firstName"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Ad"
                placeholder="Adınızı girin"
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.lastName}
            error={errors.lastName}
            name="lastName"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Soyad"
                placeholder="Soyadınızı girin"
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.email}
            error={errors.email}
            name="email"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="E-Posta"
                placeholder="E-posta adresinizi giriniz."
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.phoneNumber}
            error={errors.phoneNumber}
            name="phoneNumber"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Telefon Numarası"
                placeholder="Telefon numaranızı girin"
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
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
              <SugradoTextInput
                label="Parola"
                placeholder="Parolanızı girin"
                onBlur={onBlur}
                valueChange={onChange}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.passwordAgain}
            error={errors.passwordAgain}
            name="passwordAgain"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}) => (
              <SugradoTextInput
                label="Parola Tekrarı"
                placeholder="Parolanızı tekrar girin"
                onBlur={onBlur}
                valueChange={onChange}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
              />
            )}
          />
          <SugradoButton
            title="Kaydol"
            onPress={handleSubmit(onSubmit)}
            style={styles.save_button}
            icon="content-save"
          />
        </View>
      </TopSmallIconLayout>
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 10,
    width: '75%',
    alignSelf: 'center',
  },
  save_button: {
    marginTop: 20,
    width: '75%',
    alignSelf: 'center',
  },
});

export default Register;
