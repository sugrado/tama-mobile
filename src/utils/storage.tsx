import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoggedUserType, TokenDto} from '../dtos/auth.dto';
import {STORAGE_KEYS} from '../constants';

export const saveAuthDataToStorage = async (
  accessToken: TokenDto,
  refreshToken: TokenDto,
  user: LoggedUserType,
) => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.ACCESS_TOKEN,
    JSON.stringify(accessToken),
  );
  await AsyncStorage.setItem(
    STORAGE_KEYS.REFRESH_TOKEN,
    JSON.stringify(refreshToken),
  );
  await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
};

export const removeAuthDataFromStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
  await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};
