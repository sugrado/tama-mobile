import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CustomError, InterfaceError} from '../../../utils/customErrors';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import Loading from '../../../components/layout/Loading';
import {useForm} from 'react-hook-form';
import SugradoFormField from '../../../components/core/SugradoFormField';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import SugradoButton from '../../../components/core/SugradoButton';
import {changeEmail} from '../../../api/auths/auth';
import {COLORS, FORM_ERROR_MESSAGES, REGEXES} from '../../../constants';
import {useAuth} from '../../../contexts/AuthContext';
import SugradoInfoCard from '../../../components/core/SugradoInfoCard';

const ChangeEmail = () => {
  const {userInfo, logout} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      currentEmail: userInfo!.email,
      newEmail: '',
      newEmailConfirm: '',
    },
  });

  const rules = {
    currentEmail: {
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
    newEmail: {
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
    newEmailConfirm: {
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
  };

  const onSubmit = async (data: any) => {
    if (data.newEmail !== data.newEmailConfirm) {
      setError({message: 'Yeni e-postalar uyuşmuyor'} as InterfaceError);
      return;
    }
    if (data.newEmail === data.currentEmail) {
      setError({
        message: 'Yeni e-posta eskisinden farklı olmalıdır.',
      } as InterfaceError);
      return;
    }
    setLoading(true);
    const response = await changeEmail({
      newEmail: data.newEmail,
      newEmailConfirm: data.newEmailConfirm,
    });
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    await logout();
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopSmallIconLayout pageName="Ayarlar | E-posta Değişikliği">
        <View style={styles.container}>
          <SugradoInfoCard
            text="Yeni e-postanıza bir doğrulama bağlantısı gönderilecektir. Değişikliğin gerçekleşmesi için doğrulama bağlantısına tıkladıktan sonra kullanıcı adı ve şifreniz ile tekrar giriş yapabilirsiniz."
            icon="information-circle"
            iconSize={25}
            style={styles.info_card}
          />
          <SugradoFormField
            control={control}
            rules={rules.currentEmail}
            error={errors.currentEmail && errors.currentEmail}
            name="currentEmail"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Mevcut E-Posta"
                placeholder="Şu anki e-posta adresinizi giriniz."
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                disabled={true}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.newEmail}
            error={errors.newEmail && errors.newEmail}
            name="newEmail"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Yeni E-Posta"
                placeholder="Yeni e-posta adresinizi giriniz."
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.newEmailConfirm}
            error={errors.newEmailConfirm && errors.newEmailConfirm}
            name="newEmailConfirm"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Yeni E-Posta (Tekrar)"
                placeholder="Yeni e-posta adresinizi tekrar giriniz."
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
          />
          <SugradoButton
            title="Kaydet"
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignSelf: 'center',
    flex: 1,
    width: '75%',
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
  info_card: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  verification_code_title: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  verification_code_title_icon: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.THEME_TRANSPARENT_COLOR,
    padding: 15,
    borderRadius: 50,
  },
  verification_code_description: {
    alignSelf: 'center',
    marginBottom: 20,
    textAlign: 'center',
  },
  verification_code_input: {
    alignSelf: 'center',
    width: '100%',
  },
});

export default ChangeEmail;
