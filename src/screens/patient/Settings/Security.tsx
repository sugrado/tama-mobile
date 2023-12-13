import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {CustomError, isCritical} from '../../../utils/customErrors';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import Loading from '../../../components/layout/Loading';
import {useForm} from 'react-hook-form';
import SugradoFormField from '../../../components/core/SugradoFormField';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import SugradoButton from '../../../components/core/SugradoButton';
import {changePassword} from '../../../api/auths/auth';
import {FORM_ERROR_MESSAGES} from '../../../constants';
import SugradoSuccessSnackbar from '../../../components/core/SugradoSuccessSnackbar';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Security = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  // TODO: uygulama genelinde parola validator yazılacak
  const rules = {
    currentPassword: {
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
    newPassword: {
      required: 'Yeni şifrenizi giriniz',
      minLength: {
        value: 8,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(8),
      },
      maxLength: {
        value: 16,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(16),
      },
    },
    newPasswordConfirm: {
      required: 'Yeni şifrenizi tekrar giriniz',
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
    setLoading(true);
    const body = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      newPasswordConfirm: data.newPasswordConfirm,
    };
    const response = await changePassword(body);
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    setSuccess(true);
    reset();
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage
          retry={() => {
            setError(null);
            reset();
          }}
        />
      ) : (
        <TopSmallIconLayout pageName="Ayarlar | Güvenlik">
          <View style={styles.container}>
            <View style={styles.header_container}>
              <Text variant="titleMedium">Parola Değiştir</Text>
              <MaterialCommunityIcons
                name="shield-lock"
                size={24}
                color="black"
              />
            </View>
            <SugradoFormField
              control={control}
              rules={rules.currentPassword}
              error={errors.currentPassword && errors.currentPassword}
              name="currentPassword"
              style={styles.input}
              render={({field: {onChange, onBlur, value}}) => (
                <SugradoTextInput
                  label="Parola"
                  placeholder="Kullandığınız parolayı girin."
                  onBlur={onBlur}
                  valueChange={onChange}
                  value={value}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  disabled={success}
                />
              )}
            />
            <SugradoFormField
              control={control}
              rules={rules.newPassword}
              error={errors.newPassword && errors.newPassword}
              name="newPassword"
              style={styles.input}
              render={({field: {onChange, onBlur, value}}) => (
                <SugradoTextInput
                  label="Yeni Parola"
                  placeholder="Yeni parolanızı girin"
                  onBlur={onBlur}
                  valueChange={onChange}
                  value={value}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  disabled={success}
                />
              )}
            />
            <SugradoFormField
              control={control}
              rules={rules.newPasswordConfirm}
              error={errors.newPasswordConfirm && errors.newPasswordConfirm}
              name="newPasswordConfirm"
              style={styles.input}
              render={({field: {onChange, onBlur, value}}) => (
                <SugradoTextInput
                  label="Yeni Parola (Tekrar)"
                  placeholder="Yeni parolanızı tekrar girin"
                  onBlur={onBlur}
                  valueChange={onChange}
                  value={value}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  disabled={success}
                />
              )}
            />
            <SugradoButton
              title="Kaydet"
              onPress={handleSubmit(onSubmit)}
              style={styles.save_button}
              icon="content-save"
              disabled={success}
            />
          </View>
        </TopSmallIconLayout>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
      <SugradoSuccessSnackbar setVisible={setSuccess} visible={success} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
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
});

export default Security;
