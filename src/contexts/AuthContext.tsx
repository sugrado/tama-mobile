import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {
  UserRoles,
  TokenDto,
  LoggedResponse,
  LoggedUserType,
  LoggedDoctorDto,
  LoggedPatientDto,
  LoggedPatientRelativeDto,
} from '../dtos/auth.dto';
import {
  removeAuthDataFromStorage,
  saveAuthDataToStorage,
} from '../utils/storage';
import {STORAGE_KEYS} from '../constants';
import {login, revokeToken} from '../api/auth';
import {acceptConsent} from '../api/patient';

type AuthContextType = {
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: LoggedUserType;
  doctorLogin: (email: string, password: string) => Promise<void>;
  patientLogin: (username: string, password: string) => Promise<void>;
  patientRelativeLogin: (email: string, password: string) => Promise<void>;
  setPatientConsentStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<TokenDto | null>(null);
  const [refreshToken, setRefreshToken] = useState<TokenDto | null>(null);
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(null);

  useEffect(() => {
    isLoggedIn();
  }, []);

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
    await setStatesAndStorageItems<LoggedDoctorDto>(loginRes, 'doctor');
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
    await setStatesAndStorageItems<LoggedPatientDto>(loginRes, 'patient');
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
    await setStatesAndStorageItems<LoggedPatientRelativeDto>(
      loginRes,
      'patientRelative',
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
    setUserInfo(null);
    setAccessToken(null);
    setRefreshToken(null);
    await removeAuthDataFromStorage();
    setIsLoading(false);
  };

  // Private functions
  const isLoggedIn = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
      let accessTokenStorage = await AsyncStorage.getItem(
        STORAGE_KEYS.ACCESS_TOKEN,
      );
      let refreshTokenStorage = await AsyncStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN,
      );

      if (info && accessTokenStorage && refreshTokenStorage) {
        setAccessToken(JSON.parse(accessTokenStorage));
        setRefreshToken(JSON.parse(refreshTokenStorage));
        setUserInfo(JSON.parse(info));
      }

      setIsLoading(false);
    } catch (error) {
      console.log('eerr', error);
    }
  };

  const setStatesAndStorageItems = async <TUser extends LoggedUserType>(
    loginRes: LoggedResponse,
    userTypeKey: 'doctor' | 'patient' | 'patientRelative',
  ): Promise<void> => {
    const {tokens, [userTypeKey]: user} = loginRes;
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUserInfo(user as TUser);

    await saveAuthDataToStorage(
      tokens.accessToken as TokenDto,
      tokens.refreshToken as TokenDto,
      user as TUser,
    );
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
        } as AuthContextType
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
