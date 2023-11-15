import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoggedUserType, TokenDto} from '../api/auths/dtos/auth.dto';
import {STORAGE_KEYS} from '../constants';

export const saveAuthDataToStorage = async (
  accessToken: TokenDto,
  refreshToken: TokenDto,
  user: LoggedUserType,
) => {
  await setAccessTokenToStorage(accessToken);
  await setRefreshTokenToStorage(refreshToken);
  await setUserInfoToStorage(user);
};

export const removeAuthDataFromStorage = async () => {
  await removeUserInfoFromStorage();
  await removeAccessTokenFromStorage();
  await removeRefreshTokenFromStorage();
};

// get operations
export const getAccessTokenFromStorage = async (): Promise<TokenDto | null> => {
  const accessTokenStorage = await AsyncStorage.getItem(
    STORAGE_KEYS.ACCESS_TOKEN,
  );
  const parsedAccessToken: TokenDto | null =
    accessTokenStorage && JSON.parse(accessTokenStorage);
  return parsedAccessToken;
};

export const getRefreshTokenFromStorage =
  async (): Promise<TokenDto | null> => {
    const refreshTokenStorage = await AsyncStorage.getItem(
      STORAGE_KEYS.REFRESH_TOKEN,
    );
    const parsedRefreshToken: TokenDto | null =
      refreshTokenStorage && JSON.parse(refreshTokenStorage);
    return parsedRefreshToken;
  };

export const getUserInfoFromStorage =
  async (): Promise<LoggedUserType | null> => {
    const info = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
    const parsedInfo: LoggedUserType | null = info && JSON.parse(info);
    return parsedInfo;
  };

// set operations
export const setAccessTokenToStorage = async (
  token: TokenDto,
): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(token));
};

export const setRefreshTokenToStorage = async (
  token: TokenDto,
): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(token));
};

export const setUserInfoToStorage = async (
  user: LoggedUserType,
): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
};

// remove operations
export const removeAccessTokenFromStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const removeRefreshTokenFromStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const removeUserInfoFromStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
};
