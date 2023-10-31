import {StyleSheet} from 'react-native';
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
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';

const FirstAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        identityNumber: '',
        birthAt: '',
        phoneNumber: '',
        email: '',
      },
      appointmentInfo: {
        doctorId: '',
        date: '',
        time: '',
      },
    },
  });

  const rules = {
    personalInfo: {
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
        pattern: {
          value: REGEXES.DATE,
          message: FORM_ERROR_MESSAGES.DATE,
        },
      },
      phoneNumber: {
        required: {
          value: true,
          message: FORM_ERROR_MESSAGES.REQUIRED,
        },
        maxLength: {
          value: 10,
          message: FORM_ERROR_MESSAGES.PHONE_NUMBER,
        },
        minLength: {
          value: 10,
          message: FORM_ERROR_MESSAGES.PHONE_NUMBER,
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
      },
    },
    appointmentInfo: {
      doctorId: {
        required: {
          value: true,
          message: FORM_ERROR_MESSAGES.REQUIRED,
        },
      },
      date: {
        required: {
          value: true,
          message: FORM_ERROR_MESSAGES.REQUIRED,
        },
      },
      time: {
        required: {
          value: true,
          message: FORM_ERROR_MESSAGES.REQUIRED,
        },
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
          name="personalInfo.firstName"
          style={styles.input}
          rules={rules.personalInfo.firstName}
          error={errors.personalInfo && errors.personalInfo.firstName}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
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
          name="personalInfo.lastName"
          rules={rules.personalInfo.lastName}
          error={errors.personalInfo && errors.personalInfo.lastName}
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
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
          name="personalInfo.identityNumber"
          rules={rules.personalInfo.identityNumber}
          error={errors.personalInfo && errors.personalInfo.identityNumber}
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
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
          name="personalInfo.birthAt"
          rules={rules.personalInfo.birthAt}
          error={errors.personalInfo && errors.personalInfo.birthAt}
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              label="Doğum Tarihi"
              placeholder="Örn: 01.01.1990"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
            />
          )}
        />
        <SugradoFormField
          control={control}
          name="personalInfo.email"
          rules={rules.personalInfo.email}
          error={errors.personalInfo && errors.personalInfo.email}
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              label="E-posta"
              placeholder="Örn: örnek@mail.com"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        <SugradoFormField
          control={control}
          name="personalInfo.phoneNumber"
          rules={rules.personalInfo.phoneNumber}
          error={errors.personalInfo && errors.personalInfo.phoneNumber}
          style={styles.input}
          render={({field: {onChange, onBlur, value}}) => (
            <SugradoTextInput
              label="Telefon"
              placeholder="550_______"
              onBlur={onBlur}
              valueChange={onChange}
              value={value}
              keyboardType="phone-pad"
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
    marginTop: 15,
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
