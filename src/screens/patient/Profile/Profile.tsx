import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
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
import {profile, getQRCode} from '../../../api/patients/patient';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import {CustomError} from '../../../utils/customErrors';
import SugradoModal from '../../../components/core/SugradoModal';
import {Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
  const {logout} = useAuth();
  const [logoutDialogVisible, setLogoutDialogVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [qrCode, setQrCode] = useState<string>();
  const [qrModalVisible, setQrModalVisible] = useState<boolean>(false);
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
      },
      address: '',
      dailyTeaConsumption: '',
      dailyCoffeeConsumption: '',
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
    setValue('address', response.data!.address);
    setValue('dailyTeaConsumption', String(response.data!.dailyTeaConsumption));
    setValue(
      'dailyCoffeeConsumption',
      String(response.data!.dailyCoffeeConsumption),
    );
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

  const handleShowQRCode = async () => {
    if (qrCode) {
      setQrModalVisible(true);
      return;
    }
    setLoading(true);
    const myQR = await getQRCode();
    if (myQR.error) {
      setLoading(false);
      setError(myQR.error);
      return;
    }
    const base64Image = 'data:image/png;base64,' + myQR.data!.qrCode;
    setQrCode(base64Image);
    setLoading(false);
    setQrModalVisible(true);
  };

  const closeQRModal = () => {
    setQrModalVisible(false);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      <SugradoModal
        visible={qrModalVisible}
        onDismiss={closeQRModal}
        dismissable={true}>
        {qrCode && (
          <Image
            source={{uri: qrCode}}
            style={styles.qr_code}
            height={300}
            width={300}
          />
        )}
        <SugradoButton
          onPress={closeQRModal}
          title="Kapat"
          buttonColor="gray"
          style={styles.modal_footer_button}
        />
      </SugradoModal>
      {error == null ? (
        <TopSmallIconLayout pageName="Profil Bilgileri">
          <TouchableOpacity
            onPress={handleShowQRCode}
            activeOpacity={0.7}
            style={styles.qr_code_container}>
            <MaterialIcons
              style={styles.qr_icon}
              name="qr-code"
              size={70}
              color={COLORS.BUTTON_COLOR}
            />
            <Text variant="bodyMedium" style={styles.show_qr_code_text}>
              QR Kodunu Gör
            </Text>
          </TouchableOpacity>
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
    padding: 10,
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
