import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FORM_ERROR_MESSAGES} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import Loading from '../../../components/layout/Loading';
import SugradoButton from '../../../components/core/SugradoButton';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoFormField from '../../../components/core/SugradoFormField';
import {useForm} from 'react-hook-form';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoSuccessSnackbar from '../../../components/core/SugradoSuccessSnackbar';
import {GetProfileFromAuthResponse} from '../../../api/relatives/dtos/get-profile-from-auth-response.dto';
import {profile, update} from '../../../api/relatives/relative';
import {UpdateFromAuthCommand} from '../../../api/relatives/dtos/update-from-auth.dto';

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
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
        phoneNumber: '',
      },
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
    phoneNumber: {
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
    setFormValues(response.data!);
    setLoading(false);
  };

  const setFormValues = (data: GetProfileFromAuthResponse): void => {
    setValue('user.firstName', data.user.firstName);
    setValue('user.lastName', data.user.lastName);
    setValue('user.phoneNumber', data.user.phoneNumber);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const body = {
      phoneNumber: data.user.phoneNumber,
    } as UpdateFromAuthCommand;
    const response = await update(body);
    if (response?.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setSuccess(!success);
    setError(null);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMyInfo} />
      ) : (
        <>
          {!loading && (
            <TopSmallIconLayout
              pageName="Ayarlar | Bilgilerim"
              refreshMethod={getMyInfo}>
              <View style={styles.container}>
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
                  rules={rules.phoneNumber}
                  error={errors.user && errors.user.phoneNumber}
                  name="user.phoneNumber"
                  style={styles.input}
                  render={({field: {onChange, onBlur, value}}: any) => (
                    <SugradoTextInput
                      label="Telefon Numarası"
                      placeholder="5__ ___ __ __"
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
              </View>
            </TopSmallIconLayout>
          )}
        </>
      )}
      {error && <SugradoErrorSnackbar error={error} />}
      <SugradoSuccessSnackbar setVisible={setSuccess} visible={success} />
    </>
  );
}

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
