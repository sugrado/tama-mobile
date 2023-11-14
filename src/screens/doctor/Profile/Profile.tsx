import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useAuth} from '../../../contexts/AuthContext';
import {COLORS, FORM_ERROR_MESSAGES, REGEXES} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import Loading from '../../../components/layout/Loading';
import SugradoTextArea from '../../../components/core/SugradoTextArea';
import SugradoButton from '../../../components/core/SugradoButton';
import SugradoDialog from '../../../components/core/SugradoDialog';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoFormField from '../../../components/core/SugradoFormField';
import {useForm} from 'react-hook-form';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError} from '../../../utils/customErrors';
import {profile} from '../../../api/doctor';

export default function Profile() {
  const {logout} = useAuth();
  const [logoutDialogVisible, setLogoutDialogVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      workAddress: '',
    },
  });

  useEffect(() => {
    getMyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMyInfo = async () => {
    setLoading(true);
    const response = await profile();
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setError(null);
    setValue('user.firstName', response.data!.user.firstName);
    setValue('user.lastName', response.data!.user.lastName);
    setValue('user.email', response.data!.user.email);
    setValue('user.phoneNumber', response.data!.user.phoneNumber);
    setValue('workAddress', response.data!.workAddress);
    setLoading(false);
  };

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
    },
    workAddress: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 250,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(250),
      },
    },
  };

  const showLogoutDialog = () => setLogoutDialogVisible(true);
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    const err = await logout();
    console.log(err);
    if (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error == null ? (
        <TopSmallIconLayout pageName="Profil Bilgileri">
          <SugradoFormField
            control={control}
            rules={rules.firstName}
            error={errors.user && errors.user.firstName}
            name="user.firstName"
            style={styles.input}
            render={() => (
              <SugradoTextInput
                label="Ad"
                placeholder="Ad"
                value={getValues('user.firstName')}
                disabled={true}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.lastName}
            error={errors.user && errors.user.lastName}
            name="user.lastName"
            style={styles.input}
            render={() => (
              <SugradoTextInput
                label="Soyad"
                placeholder="Soyad"
                value={getValues('user.lastName')}
                disabled={true}
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.email}
            error={errors.user && errors.user.email}
            name="user.email"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Email"
                placeholder="Örn: ornek@email.com"
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
            error={errors.user && errors.user.phoneNumber}
            name="user.phoneNumber"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextInput
                label="Telefon Numarası"
                placeholder="Örn: 555 555 55 55"
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
              />
            )}
          />
          <SugradoFormField
            control={control}
            rules={rules.workAddress}
            error={errors.workAddress}
            name="workAddress"
            style={styles.input}
            render={({field: {onChange, onBlur, value}}: any) => (
              <SugradoTextArea
                label="Adres"
                placeholder="Örn: Örnek Mah. Örnek Sok. Örnek Apt. No: 1 D: 1 Keçiören/Ankara"
                value={value}
                valueChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <SugradoButton
            title="Değişiklikleri Kaydet"
            onPress={handleSubmit(onSubmit)}
            style={styles.save_button}
            icon="content-save"
          />
          <SugradoButton
            title="Çıkış Yap"
            onPress={showLogoutDialog}
            style={styles.save_button}
            icon="logout"
            buttonColor={COLORS.DARK_RED}
          />
          <SugradoDialog
            title="Çıkış Yap"
            body="Hesabınızdan çıkış yapmak istediğinizden emin misiniz?"
            visible={logoutDialogVisible}
            action={handleLogout}
            actionText="Evet"
            cancelAction={() => setLogoutDialogVisible(false)}
            cancelText="Hayır"
          />
        </TopSmallIconLayout>
      ) : (
        <SugradoErrorSnackbar error={error} retry={() => getMyInfo()} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    width: '75%',
    alignSelf: 'center',
  },
  save_button: {
    marginTop: 20,
    width: '75%',
    alignSelf: 'center',
  },
});
