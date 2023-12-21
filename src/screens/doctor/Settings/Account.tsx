import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {FORM_ERROR_MESSAGES} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import Loading from '../../../components/layout/Loading';
import SugradoTextArea from '../../../components/core/SugradoTextArea';
import SugradoButton from '../../../components/core/SugradoButton';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoFormField from '../../../components/core/SugradoFormField';
import {useForm} from 'react-hook-form';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError, isCritical} from '../../../utils/customErrors';
import {profile} from '../../../api/doctors/doctor';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoSuccessSnackbar from '../../../components/core/SugradoSuccessSnackbar';
import SugradoSwitchInput from '../../../components/core/SugradoSwitchInput';
import {GetProfileFromAuthResponse} from '../../../api/doctors/dtos/get-profile-from-auth-response.dto';

export default function Profile() {
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
      workAddress: '',
      availableForAppointment: '',
      titleName: '',
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
    availableForAppointment: {},
    titleName: {},
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

  const setFormValues = (response: GetProfileFromAuthResponse): void => {
    setValue('user.firstName', response.user.firstName);
    setValue('user.lastName', response.user.lastName);
    setValue('user.phoneNumber', response.user.phoneNumber);
    setValue('workAddress', response.workAddress);
    setValue(
      'availableForAppointment',
      String(response.availableForAppointment),
    );
    setValue('titleName', String(response.titleName));
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={getMyInfo} />
      ) : (
        <>
          {!loading && (
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
                rules={rules.titleName}
                error={errors.titleName}
                name="titleName"
                style={styles.input}
                render={() => (
                  <SugradoTextInput
                    label="Ünvan"
                    placeholder="Ünvan"
                    value={getValues('titleName')}
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
                render={({field: {onChange, onBlur, value}}) => (
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
                render={({field: {onChange, onBlur, value}}) => (
                  <SugradoTextArea
                    label="Adres"
                    placeholder="Örn: Örnek Mah. Örnek Sok. Örnek Apt. No: 1 D: 1 Keçiören/Ankara"
                    value={value}
                    valueChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <SugradoFormField
                control={control}
                rules={rules.availableForAppointment}
                error={errors.availableForAppointment}
                name="availableForAppointment"
                style={styles.input}
                render={({field: {onChange, value}}) => (
                  <SugradoSwitchInput
                    label="Randevu Alınabilir"
                    value={value}
                    valueChange={onChange}
                  />
                )}
              />
              <SugradoButton
                title="Değişiklikleri Kaydet"
                onPress={handleSubmit(onSubmit)}
                style={styles.save_button}
                icon="content-save"
              />
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
