import {View, StyleSheet, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  COLORS,
  DIMENSIONS,
  FORM_ERROR_MESSAGES,
  REGEXES,
} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import SugradoFormField from '../../../components/core/SugradoFormField';
import SugradoButton from '../../../components/core/SugradoButton';
import Loading from '../../../components/layout/Loading';
import {Text} from 'react-native-paper';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';

const FirstAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      identityNumber: '',
      birthAt: '',
    },
  });

  const rules = {
    firstName: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      minLength: {
        value: 2,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(2),
      },
      maxLength: {
        value: 20,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(20),
      },
    },
    lastName: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      minLength: {
        value: 2,
        message: FORM_ERROR_MESSAGES.MIN_LENGTH(2),
      },
      maxLength: {
        value: 20,
        message: FORM_ERROR_MESSAGES.MAX_LENGTH(20),
      },
    },
    identityNumber: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      maxLength: {
        value: 11,
        message: FORM_ERROR_MESSAGES.IDENTITY_NUMBER,
      },
      minLength: {
        value: 11,
        message: FORM_ERROR_MESSAGES.IDENTITY_NUMBER,
      },
    },
    birthAt: {
      required: {
        value: true,
        message: FORM_ERROR_MESSAGES.REQUIRED,
      },
      validate: (value: string) => {
        if (!REGEXES.DATE.test(value)) {
          return FORM_ERROR_MESSAGES.DATE;
        }
        return true;
      },
    },
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    // TODO: API call
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopSmallIconLayout pageName="İlk Randevu">
        <SugradoFormField
          control={control}
          name="firstName"
          rules={rules.firstName}
          error={errors.firstName}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              style={styles.input}
              label="Ad"
              placeholder="Örn: Ali"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
            />
          )}
        />
        <SugradoFormField
          control={control}
          name="lastName"
          rules={rules.lastName}
          error={errors.lastName}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              style={styles.input}
              label="Soyad"
              placeholder="Örn: Yılmaz"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
            />
          )}
        />
        <SugradoFormField
          control={control}
          name="identityNumber"
          rules={rules.identityNumber}
          error={errors.identityNumber}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              style={styles.input}
              label="TC Kimlik Numarası"
              placeholder="Örn: 12345678910"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
        <SugradoFormField
          control={control}
          name="birthAt"
          rules={rules.birthAt}
          error={errors.birthAt}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              style={styles.input}
              label="Doğum Tarihi"
              placeholder="Örn: 01.01.1990"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
            />
          )}
        />
        <SugradoButton
          title="Randevu Oluştur"
          icon="plus"
          onPress={handleSubmit(onSubmit)}
          style={styles.save_button}
        />
      </TopSmallIconLayout>
    </>
  );
};

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: COLORS.THEME_COLOR,
    flex: 1,
  },
  header: {
    height: (DIMENSIONS.AVAILABLE_HEIGHT * 15) / 100,
    padding: 10,
    alignItems: 'center',
  },
  header_text: {
    color: COLORS.TEXT,
  },
  header_logo: {
    resizeMode: 'contain',
    height: '60%',
    width: 100,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingBottom: 20,
    flex: 1,
  },
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

export default FirstAppointment;
