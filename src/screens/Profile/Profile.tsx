import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../../contexts/AuthContext';
import {COLORS, DIMENSIONS} from '../../constants';
import SugradoText from '../../components/core/SugradoText';
import Loading from '../../components/layout/Loading';
import SugradoTextArea from '../../components/core/SugradoTextArea';
import SugradoButton from '../../components/core/SugradoButton';
import SugradoDialog from '../../components/core/SugradoDialog';

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
    setAddress('Örnek Mah. Deneme Sok. No: 20:67 Keçiören/Ankara');
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

  const handleLogout = () => {
    logout();
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
      <ScrollView
        style={styles.scroll_container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/icon_transparent.png')}
            style={styles.header_logo}
          />
          <Text variant="titleMedium" style={styles.header_text}>
            TAMA - Profil Bilgileri
          </Text>
        </View>
        <View style={styles.content}>
          <SugradoText
            style={styles.input}
            label="Ad"
            value={firstName}
            disabled={true}
          />
          <SugradoText
            style={styles.input}
            label="Soyad"
            value={lastName}
            disabled={true}
          />
          <SugradoText
            style={styles.input}
            label="Email"
            value={email}
            valueChange={e => {
              setEmail(e);
            }}
            keyboardType="email-address"
          />
          <SugradoText
            style={styles.input}
            label="Yakınınızın Emaili"
            value={relativeEmail}
            valueChange={e => {
              setRelativeEmail(e);
            }}
            keyboardType="email-address"
          />
          <SugradoTextArea
            style={styles.input}
            label="Adres"
            value={address}
            valueChange={e => {
              setAddress(e);
            }}
          />
          <SugradoText
            style={styles.input}
            label="Günlük Çay Tüketimi (ml)"
            value={dailyTeaConsumption}
            valueChange={e => {
              setDailyTeaConsumption(e);
            }}
            keyboardType="numeric"
          />
          <SugradoText
            style={styles.input}
            label="Günlük Kahve Tüketimi (ml)"
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
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: COLORS.THEME_GREEN,
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
