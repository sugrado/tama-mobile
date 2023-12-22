import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TopSmallIconLayout from '../../../components/layout/TopSmallIconLayout';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, PAGE_NAMES} from '../../../constants';
import {useAuth} from '../../../contexts/AuthContext';
import SugradoDialog from '../../../components/core/SugradoDialog';
import {CustomError, isCritical} from '../../../utils/customErrors';
import Loading from '../../../components/layout/Loading';
import SugradoErrorPage from '../../../components/core/SugradoErrorPage';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';

const Settings = ({navigation}: any) => {
  const {logout} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [logoutDialogVisible, setLogoutDialogVisible] =
    useState<boolean>(false);

  const handleAccountPress = () => {
    navigation.navigate(PAGE_NAMES.DOCTOR.SETTINGS.ACCOUNT);
  };

  const handleLogoutPress = () => {
    setLogoutDialogVisible(true);
  };

  const handleChangePasswordPress = async () => {
    navigation.navigate(PAGE_NAMES.DOCTOR.SETTINGS.CHANGE_PASSWORD);
  };

  const handleChangeEmailPress = async () => {
    navigation.navigate(PAGE_NAMES.DOCTOR.SETTINGS.CHANGE_EMAIL);
  };

  const handleLogout = async () => {
    setLoading(true);
    const err = await logout();
    if (err) {
      setError(err);
      setLogoutDialogVisible(false);
      setLoading(false);
      return;
    }
    setError(null);
    setLogoutDialogVisible(false);
    setLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {loading && <Loading loading={loading} />}
      {error && isCritical(error) ? (
        <SugradoErrorPage retry={clearError} />
      ) : (
        <TopSmallIconLayout pageName="Ayarlar">
          <View style={styles.container}>
            <SettingRow
              icon="account"
              title="Bilgilerim"
              onPress={handleAccountPress}
            />
            <Divider />
            <SettingRow
              icon="lock"
              title="Parola Değişikliği"
              onPress={handleChangePasswordPress}
            />
            <Divider />
            <SettingRow
              icon="email"
              title="E-posta Değişikliği"
              onPress={handleChangeEmailPress}
            />
            <Divider />
            <SettingRow
              icon="logout"
              title="Çıkış Yap"
              color={COLORS.DARK_RED}
              showChevron={false}
              onPress={handleLogoutPress}
            />
          </View>
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
      )}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

type SettingRowProps = {
  title: string;
  onPress: () => void;
  icon: string;
  color?: string;
  showChevron?: boolean;
};

const SettingRow = ({
  title,
  onPress,
  icon,
  color = 'black',
  showChevron = true,
}: SettingRowProps) => {
  return (
    <TouchableOpacity
      style={styles.setting_row_container}
      onPress={onPress}
      activeOpacity={0.6}>
      <View style={styles.setting_row}>
        <View style={styles.setting_row_title}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={color}
            style={styles.setting_row_icon}
          />
          <Text style={[styles.setting_row_text, {color: color}]}>{title}</Text>
        </View>
        {showChevron && <Entypo name="chevron-right" size={20} color={color} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    marginTop: 15,
  },
  setting_row_container: {
    margin: 10,
  },
  setting_row_title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setting_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  setting_row_text: {
    fontSize: 16,
  },
  setting_row_icon: {
    marginRight: 5,
  },
});

export default Settings;
