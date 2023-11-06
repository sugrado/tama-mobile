import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useAuth} from '../../../contexts/AuthContext';
import {COLORS} from '../../../constants';
import SugradoTextInput from '../../../components/core/SugradoTextInput';
import Loading from '../../../components/layout/Loading';
import SugradoTextArea from '../../../components/core/SugradoTextArea';
import SugradoButton from '../../../components/core/SugradoButton';
import SugradoDialog from '../../../components/core/SugradoDialog';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';

export default function Profile() {
  const {logout} = useAuth();
  const [logoutDialogVisible, setLogoutDialogVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [relativeEmail, setRelativeEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [dailyTeaConsumption, setDailyTeaConsumption] = useState<string | null>(
    null,
  );
  const [dailyCoffeeConsumption, setDailyCoffeeConsumption] = useState<
    string | null
  >(null);

  useEffect(() => {
    // TODO: Go to API and get user data
    setLoading(true);
    setFirstName('Görkem Rıdvan');
    setLastName('ARIK');
    setEmail('gorkem@mail.com');
    setRelativeEmail('ridvan@mail.com');
    setAddress('Örnek Mah. Deneme Sok. No: 20/67 Keçiören/Ankara');
    setDailyTeaConsumption('5');
    setDailyCoffeeConsumption('3');
    setLoading(false);
  }, []);

  const showLogoutDialog = () => setLogoutDialogVisible(true);

  const handleSaveChanges = () => {
    if (!isFormValid) {
      return;
    }
    // TODO: Go to api and patch user data
    console.log('updated');
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  // TODO: Form validation
  const isFormValid = () =>
    email &&
    relativeEmail &&
    address &&
    dailyTeaConsumption &&
    dailyCoffeeConsumption;

  return (
    <>
      {loading && <Loading loading={loading} />}
      <TopSmallIconLayout pageName="Profil Bilgileri">
        <SugradoTextInput
          label="Ad"
          style={styles.input}
          placeholder="Ad"
          value={firstName}
          disabled={true}
        />
        <SugradoTextInput
          label="Soyad"
          style={styles.input}
          placeholder="Soyad"
          value={lastName}
          disabled={true}
        />
        <SugradoTextInput
          label="Email"
          style={styles.input}
          placeholder="Email"
          value={email}
          valueChange={e => {
            setEmail(e);
          }}
          keyboardType="email-address"
        />
        <SugradoTextInput
          label="Yakınınızın Emaili"
          style={styles.input}
          placeholder="Yakınınızın Emaili"
          value={relativeEmail}
          valueChange={e => {
            setRelativeEmail(e);
          }}
          keyboardType="email-address"
        />
        <SugradoTextArea
          label="Adres"
          style={styles.input}
          placeholder="Adres"
          value={address}
          valueChange={e => {
            setAddress(e);
          }}
        />
        <SugradoTextInput
          label="Günlük Çay Tüketimi (ml)"
          style={styles.input}
          placeholder="Günlük Çay Tüketimi (ml)"
          value={dailyTeaConsumption}
          valueChange={e => {
            setDailyTeaConsumption(e);
          }}
          keyboardType="numeric"
        />
        <SugradoTextInput
          label="Günlük Kahve Tüketimi (ml)"
          style={styles.input}
          placeholder="Günlük Kahve Tüketimi (ml)"
          value={dailyCoffeeConsumption}
          valueChange={e => {
            setDailyCoffeeConsumption(e);
          }}
          keyboardType="numeric"
        />
        <SugradoButton
          title="Değişiklikleri Kaydet"
          onPress={handleSaveChanges}
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
