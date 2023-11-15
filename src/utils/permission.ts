import {Alert, Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

export const checkCameraPermission = async (): Promise<boolean> => {
  const permissionType =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const checkRes = await check(permissionType);
  if (checkRes === RESULTS.GRANTED) {
    return true;
  }
  const reqRes = await request(permissionType);
  if (reqRes === RESULTS.GRANTED) {
    return true;
  }
  return false;
};

export const showPermissionRequiredAlert = () => {
  Alert.alert(
    'Uyarı',
    'İşleme devam etmek için kamera izni vermeniz gerekiyor.',
    [
      {
        style: 'cancel',
        text: 'İptal',
      },
      {
        style: 'default',
        text: 'Ayarlar',
        onPress: async () => await openSettings(),
      },
    ],
  );
};
