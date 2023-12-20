import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FORM_ERROR_MESSAGES} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import Loading from '../../../components/layout/Loading';
import SugradoTextArea from '../../../components/core/SugradoTextArea';
import SugradoButton from '../../../components/core/SugradoButton';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import SugradoFormField from '../../../components/core/SugradoFormField';
import {useForm} from 'react-hook-form';
import {profile, update} from '../../../api/patients/patient';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError, isCritical} from '../../../utils/customErrors';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import {UpdateFromAuthCommand} from '../../../api/patients/dtos/update-from-auth.dto';
import {GetProfileFromAuthResponse} from '../../../api/patients/dtos/patient-profle-response.dto';
import SugradoSuccessSnackbar from '../../../components/core/SugradoSuccessSnackbar';

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
      },
      address: '',
      dailyTeaConsumption: '',
      dailyCoffeeConsumption: '',
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
    address: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 250,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(250),
      },
    },
    dailyTeaConsumption: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      min: {
        value: 0,
        message: FORM_ERROR_MESSAGES.MIN_VALUE(0),
      },
    },
    dailyCoffeeConsumption: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      min: {
        value: 0,
        message: FORM_ERROR_MESSAGES.MIN_VALUE(0),
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
    setValue('address', data.address);
    setValue('dailyTeaConsumption', data.dailyTeaConsumption.toString());
    setValue('dailyCoffeeConsumption', data.dailyCoffeeConsumption.toString());
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const body = {
      address: data.address,
      dailyTeaConsumption: Number(data.dailyTeaConsumption),
      dailyCoffeeConsumption: Number(data.dailyCoffeeConsumption),
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
                  rules={rules.address}
                  error={errors.address}
                  name="address"
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
                <SugradoFormField
                  control={control}
                  rules={rules.dailyTeaConsumption}
                  error={errors.dailyTeaConsumption}
                  name="dailyTeaConsumption"
                  style={styles.input}
                  render={({field: {onChange, onBlur, value}}: any) => (
                    <SugradoTextInput
                      label="Günlük Çay Tüketimi (ml)"
                      placeholder="Örn: 200"
                      value={value}
                      valueChange={onChange}
                      onBlur={onBlur}
                      keyboardType="numeric"
                    />
                  )}
                />
                <SugradoFormField
                  control={control}
                  rules={rules.dailyCoffeeConsumption}
                  error={errors.dailyCoffeeConsumption}
                  name="dailyCoffeeConsumption"
                  style={styles.input}
                  render={({field: {onChange, onBlur, value}}: any) => (
                    <SugradoTextInput
                      label="Günlük Kahve Tüketimi (ml)"
                      placeholder="Örn: 400"
                      value={value}
                      valueChange={onChange}
                      onBlur={onBlur}
                      keyboardType="numeric"
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
  modal_footer_button: {
    marginTop: 20,
    width: '40%',
    alignSelf: 'center',
  },
  qr_code: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  qr_code_container: {
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    borderColor: COLORS.BUTTON_COLOR,
    marginTop: 20,
  },
  show_qr_code_text: {
    textAlign: 'center',
    color: COLORS.BUTTON_COLOR,
    fontWeight: 'bold',
  },
  qr_icon: {
    alignSelf: 'center',
  },
});
