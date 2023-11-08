import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {
  UserRoles,
  TokenDto,
  LoggedResponse,
  LoggedUserType,
  LoggedPatientDto,
  PreparedTokensDto,
} from '../dtos/auth.dto';
import {
  removeAuthDataFromStorage,
  saveAuthDataToStorage,
} from '../utils/storage';
import {STORAGE_KEYS} from '../constants';
import {login, refreshTokens, revokeToken} from '../api/auth';
import {acceptConsent} from '../api/patient';

type AuthContextType = {
  isLoading: boolean;
  accessToken: TokenDto | null;
  refreshToken: TokenDto | null;
  userInfo: LoggedUserType | null;
  doctorLogin: (email: string, password: string) => Promise<void>;
  patientLogin: (username: string, password: string) => Promise<void>;
  patientRelativeLogin: (email: string, password: string) => Promise<void>;
  setPatientConsentStatus: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: () => boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
  onCheckCompleted: () => void;
};

export const AuthProvider = ({
  children,
  onCheckCompleted,
}: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<TokenDto | null>(null);
  const [refreshToken, setRefreshToken] = useState<TokenDto | null>(null);
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(null);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const isLoggedIn = (): boolean =>
    accessToken != null && refreshToken != null && userInfo != null;

  const doctorLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.Doctor,
    );
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.doctor,
    );
    setIsLoading(false);
  };

  const patientLogin = async (
    username: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      username,
      password,
      UserRoles.Patient,
    );
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.patient,
    );
    setIsLoading(false);
  };

  const patientRelativeLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.PatientRelative,
    );
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.patientRelative,
    );
    setIsLoading(false);
  };

  const setPatientConsentStatus = async (): Promise<void> => {
    await acceptConsent();
    const updatedUserInfo: LoggedPatientDto = {
      ...userInfo,
      consentAccepted: true,
    } as LoggedPatientDto;
    setUserInfo(updatedUserInfo);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_INFO,
      JSON.stringify(updatedUserInfo),
    );
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await revokeToken();
    await clearAuthDataFromDevice();
    setIsLoading(false);
  };

  //Private methods
  const checkIsLoggedIn = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
      let accessTokenStorage = await AsyncStorage.getItem(
        STORAGE_KEYS.ACCESS_TOKEN,
      );
      let refreshTokenStorage = await AsyncStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN,
      );

      const parsedAccessToken: TokenDto | null =
        accessTokenStorage && JSON.parse(accessTokenStorage);
      const parsedRefreshToken: TokenDto | null =
        refreshTokenStorage && JSON.parse(refreshTokenStorage);
      const parsedInfo: LoggedUserType | null = info && JSON.parse(info);

      if (parsedInfo && parsedAccessToken && parsedRefreshToken) {
        await checkTokensValidity(
          parsedInfo,
          parsedAccessToken,
          parsedRefreshToken,
        );
      }

      setIsLoading(false);
      onCheckCompleted();
    } catch (error) {
      console.log('eerr', error);
    }
  };

  const checkTokensValidity = async (
    user: LoggedUserType,
    accToken: TokenDto,
    refToken: TokenDto,
  ): Promise<void> => {
    const now = new Date();
    const accExpr = new Date(accToken.expiration);
    const refExpr = new Date(refToken.expiration);

    if (accExpr > now && refExpr > now) {
      await setStatesAndStorageItems(accToken, refToken, user);
    } else if (accExpr < now && refExpr > now) {
      const refreshedTokens: PreparedTokensDto = await refreshTokens(
        refToken.token,
      );
      await setStatesAndStorageItems(
        refreshedTokens.accessToken,
        refreshedTokens.refreshToken,
        user,
      );
    } else {
      await clearAuthDataFromDevice();
    }
  };

  const clearAuthDataFromDevice = async (): Promise<void> => {
    setUserInfo(null);
    setAccessToken(null);
    setRefreshToken(null);
    await removeAuthDataFromStorage();
  };

  const setStatesAndStorageItems = async (
    accToken: TokenDto,
    refToken: TokenDto,
    user: any,
  ): Promise<void> => {
    setAccessToken(accToken);
    setRefreshToken(refToken);
    setUserInfo(user);

    await saveAuthDataToStorage(accToken, refToken, user);
  };

  return (
    <AuthContext.Provider
      value={
        {
          isLoading,
          accessToken,
          refreshToken,
          userInfo,
          doctorLogin,
          patientLogin,
          patientRelativeLogin,
          logout,
          setPatientConsentStatus,
          isLoggedIn,
        } as AuthContextType
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
